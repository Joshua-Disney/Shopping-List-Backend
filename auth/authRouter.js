const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./tokenService.js");
const Profiles = require("../profiles/profilesModel.js");

router.post("/register", (req, res) => {
  let profile = req.body;
  const hash = bcrypt.hashSync(profile.password, 10);
  profile.password = hash;

  Profiles.add(profile)
    .then(saved => {
      res
        .status(201)
        .json({ message: "Profile successfully registered to database." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Profile not registered.  Please try again" });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Profiles.findBy({ email })
    .first()
    .then(profile => {
      if (profile && bcrypt.compareSync(password, profile.password)) {
        const token = tokenService.generateToken(profile);
        res
          .status(200)
          .json({ message: "Profile successfully logged in.", token, profile });
      } else {
        res
          .status(401)
          .json({ message: "Profile didn't log in.  Please try again." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
