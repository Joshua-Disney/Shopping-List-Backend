const router = require("express").Router();

const Accounts = require("./accountsModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

router.get("/", restricted, (req, res) => {
  // router.get("/", (req, res) => {
  Accounts.find()
    .then(accounts => {
      res.status(200).json({ accounts });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;

//thing
