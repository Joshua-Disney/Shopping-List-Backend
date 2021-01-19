const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./usersModel.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Get users error: ", error);
    res.status(500).json({ message: "Error getting users. ", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({ message: "Here's your user.", user });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Get user by ID error: ", error);
    res.status(500).json({ message: "Error getting that user.", error });
  }
});

router.put("/:id", async (req, res) => {
  const user = req.body;
  if (user.password) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }
  try {
    const updatedUser = await Users.update(req.params.id, user);
    if (updatedUser) {
      console.log(updatedUser);
      res.status(200).json({ message: "User successfully update." });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Update user error: ", error);
    res.status(500).json({ message: "Error updating that user.", error });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.email || !user.password) {
    return res.status(400).json({
      message: "Please provide both email and password for the user.",
    });
  }

  try {
    await Users.insert(user);
    res.status(201).json({ message: "User successfully created." });
  } catch (error) {
    console.log("Create user error: ", error);
    res.status(500).json({ message: "Error creating that user.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res
        .status(200)
        .json({ messae: "The user has successfully been removed" });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Delete user error: ", error);
    res.status(500).json({ message: "Error deleting that user.", error });
  }
});

module.exports = router;
