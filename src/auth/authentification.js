const crypto = require("crypto");

export function generateAuthHeader(password) {
  const date = new Date();
  const timestamp = `${date.getUTCFullYear()}${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  const authString = `${password}_${timestamp}`;
  const hash = crypto.createHash("md5").update(authString).digest("hex");
  return hash;
}
