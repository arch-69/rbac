import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import container from "../container.js";
import generateHash from "../utils/GenerateHash.js";

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

export const hasPermission =
  (...requiredPermissions) =>
  async (req, res, next) => {
    const userRepo = container.resolve("userRepo");
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return next(new ApiError(401, "Authorization: Missing Api Key"));
    }

    const apiKeyHash = generateHash(apiKey);

    try {
      const user = await userRepo.findByApiKey(apiKeyHash).populate("role");

      if (!user) {
        return next(new ApiError(401, "Authorization: Invalid Api Key"));
      }

      const userPermissions = user.role?.permissions;

      const hasAllRequired = requiredPermissions.some((perm) =>
        userPermissions.includes(perm),
      );

      if (!hasAllRequired) {
        return next(new ApiError(403, "Permission: Permission Denied"));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new ApiError(500, error.message, error.errors));
    }
  };
