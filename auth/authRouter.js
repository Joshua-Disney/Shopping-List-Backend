const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./tokenService.js");
const Users = require("../users/usersModel.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res
        .status(201)
        .json({ message: "User successfully registered to database." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "User not registered.  Please try again" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res
          .status(200)
          .json({ message: "User successfully logged in.", token, user });
      } else {
        res
          .status(401)
          .json({ message: "User didn't log in.  Please try again." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
