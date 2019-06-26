const router = require("express").Router();

const Profiles = require("./profilesModel.js.js");
const restricted = require("../auth/restrictedMiddleware.js");

// router.get("/", restricted, (req, res) => {
router.get("/", (req, res) => {
  Profiles.find()
    .then(profiles => {
      res.status(200).json({ profiles });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;

//thing
