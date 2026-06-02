import express from "express";
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";
import { UAParser } from "ua-parser-js";
import UserRepo from "./repositories/user.repo.js";

import container from "./container.js";
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const userAgentString = req.headers["user-agent"];
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  res.send({
    message: `api is working fine`,
  });
});

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  const errorCode =
    err instanceof ApiError ? err.statusCode : err.status || 500;
  return res
    .status(errorCode)
    .json(
      new ApiResponse(
        errorCode,
        err.message || "internal service error",
        err.data || null,
      ),
    );
});

export default app;
