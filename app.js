import express from "express";
import crypto from "crypto";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "api is working",
  });
});

export default app;
