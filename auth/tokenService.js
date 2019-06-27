const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "I love Adri";

module.exports = {
  generateToken
};

function generateToken(account) {
  const payload = {
    subject: account.id,
    email: account.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
