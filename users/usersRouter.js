const router = require("express").Router();

const Users = require("./usersModel.js");
// const restricted = require("../auth/restrictedMiddleware.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Get users error: ", error);
    res.status(500).json({ message: "Error getting users. ", error });
  }
});

module.exports = router;
