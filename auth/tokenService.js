const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "I love Adri";

module.exports = {
  generateToken
};

function generateToken(profile) {
  const payload = {
    subject: profile.id,
    email: profile.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
