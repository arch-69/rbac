import crypto from "crypto";

const generateHash = (str) => {
  return crypto
    .createHmac("sha256", process.env.API_KEY_SECRET)
    .update(str)
    .digest("hex");
};

export default generateHash;
