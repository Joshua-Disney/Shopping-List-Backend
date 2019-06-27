const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./tokenService.js");
const Accounts = require("../accounts/accountsModel.js");

router.post("/register", (req, res) => {
  let account = req.body;
  const hash = bcrypt.hashSync(account.password, 10);
  account.password = hash;

  Accounts.add(account)
    .then(saved => {
      res
        .status(201)
        .json({ message: "Account successfully registered to database." });
    })
    .catch(error => {
      console.log("Register error : ", error);
      res
        .status(500)
        .json({ error, message: "Account not registered.  Please try again" });
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
        console.log("Password error : ", error);
        res
          .status(401)
          .json({ message: "Incorrect password.  Please try again." });
      }
    })
    .catch(error => {
      console.log("Login error : ", error);
      res.status(500).json(error);
    });
});

module.exports = router;
