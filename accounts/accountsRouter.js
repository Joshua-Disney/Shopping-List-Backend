const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Accounts = require("./accountsModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

router.get("/", restricted, async (req, res) => {
  // router.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.log("Get accounts error : ", error);
    res.status(500).json({ message: "Error getting accounts.", error });
  }
});


router.get("/:id", restricted, async (req, res) => {
// router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const account = await Accounts.findById(id);
    let users = await Accounts.findAccountUsers(id);
    let profiles = await Accounts.findAccountProfiles(id);
    // profiles = profiles.map(async profile => {
    //   profile.needs = await Accounts.findProfileNeeds(profile.id);
    //   profile.wants = await Accounts.findProfileWants(profile.id);
    //   return profile;
    // });
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      profile.needs = await Accounts.findProfileNeeds(profile.id);
      profile.wants = await Accounts.findProfileWants(profile.id);
    }
    if (account) {
      res.status(200).json({ ...account, users, profiles });
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


router.put("/:id", restricted, async (req, res) => {
// router.put("/:id", async (req, res) => {
  const account = req.body;
  if (account.password) {
    const hash = bcrypt.hashSync(account.password, 10);
    account.password = hash;
  }
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

router.delete("/:id", restricted, async (req, res) => {
// router.delete("/:id", async (req, res) => {
  try {
    const count = await Accounts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The account has been removed",
      });
    } else {
      res.status(404).json({
        message: "The account with the specified ID does not exist.",
      });
    }
  } catch (error) {
    console.log("Delete account error : ", error);
    res.status(500).json({ message: "Error deleting that account.", error });
  }
});

module.exports = router;
