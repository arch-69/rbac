import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthenticated: No Token Provided"));
  }

  try {
    const token = header.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      return next(new ApiError(401, "Invalid Token"));
    }

    req.user = decodedToken;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token has expired"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token signature"));
    }

    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};
