const router = require("express").Router();

const Accounts = require("./accountsModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

router.get("/", restricted, async (req, res) => {
  // router.get("/", (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.log("Get accounts error : ", error);
    res.status(500).json({ message: "Error getting accounts.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await Accounts.findById(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res
        .status(404)
        .json({ message: "The account with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Get account by id error : ", error);
    res.status(500).json({ message: "Error getting that account.", error });
  }
});

router.put("/:id", async (req, res) => {
  const account = req.body;
  try {
    const updatedAccount = await Accounts.update(req.params.id, account);
    if (account) {
      res.status(200).json({ message: "Account successfullly updated." });
    } else {
      res
        .status(404)
        .json({ message: "The account with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Update account error : ", error);
    res.status(500).json({ message: "Error updating that account.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Accounts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The account has been removed"
      });
    } else {
      res.status(404).json({
        message: "The account with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log("Delete account error : ", error);
    res.status(500).json({ message: "Error deleting that account.", error });
  }
});

module.exports = router;
