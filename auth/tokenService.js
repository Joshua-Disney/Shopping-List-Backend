const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "I love Adri";

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
