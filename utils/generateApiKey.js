import crypto from "crypto";

const generateApiKey = () => `ak_${crypto.randomBytes(24).toString("hex")}`;

export default generateApiKey;
