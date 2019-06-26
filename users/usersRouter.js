const router = require("express").Router();

const Users = require("./usersModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

// router.get("/", restricted, (req, res) => {
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;

//thing
