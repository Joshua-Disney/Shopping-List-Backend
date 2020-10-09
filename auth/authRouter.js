const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./tokenService.js");
const Accounts = require("../accounts/accountsModel.js");
const Profiles = require("../profiles/profilesModel.js");
const Users = require("../users/usersModel.js");
const usersModel = require("../users/usersModel.js");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.email || !user.password) {
    return res.status(400).json({
      message: "Please provide both email and password for the account.",
    });
  }

  const [id] = await Accounts.insert();

  Users.insert({
    ...user,
    account_id: id,
  })
    .then(async (saved) => {
      try {
        console.log("saved: ", saved);
        await Profiles.insert({ name: "Home", account_id: id });
        res
          .status(201)
          .json({ message: "Account successfully registered to database." });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error creating home profile.  Please try again later.",
        });
      }
    })
    .catch((error) => {
      console.log("Register error : ", error);
      res.status(500).json({
        error,
        message: "Error registering account.  Please try again later.",
      });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.findOne({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: "Account successfully logged in.",
          token,
          account_id: user.account_id,
        });
      } else {
        console.log("Incorrect password");
        res
          .status(401)
          .json({ message: "Incorrect password.  Please try again later." });
      }
    })
    .catch((error) => {
      console.log("Login error : ", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
