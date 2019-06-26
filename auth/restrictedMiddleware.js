const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "I love Adri";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Can't touch this!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "YOU SHALL NOT PASS!" });
  }
};
