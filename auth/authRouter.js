const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./tokenService.js");
const Accounts = require("../accounts/accountsModel.js");
const Profiles = require("../profiles/profilesModel.js");

router.post("/register", (req, res) => {
  let account = req.body;
  const hash = bcrypt.hashSync(account.password, 10);
  account.password = hash;

  if (!account.email || !account.password) {
    return res.status(400).json({
      message: "Please provide both email and password for the account."
    });
  }

  Accounts.insert(account)
    .then(async saved => {
      try {
        await Profiles.insert({ name: "Home", account_id: saved.id });
        res
          .status(201)
          .json({ message: "Account successfully registered to database." });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({
            message: "Error registering account.  Please try again later."
          });
      }
    })
    .catch(error => {
      console.log("Register error : ", error);
      res.status(500).json({
        error,
        message: "Error registering account.  Please try again later."
      });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Accounts.findBy({ email })
    .first()
    .then(account => {
      if (account && bcrypt.compareSync(password, account.password)) {
        const token = tokenService.generateToken(account);
        res
          .status(200)
          .json({ message: "Account successfully logged in.", token });
      } else {
        console.log("Incorrect password");
        res
          .status(401)
          .json({ message: "Incorrect password.  Please try again later." });
      }
    })
    .catch(error => {
      console.log("Login error : ", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
