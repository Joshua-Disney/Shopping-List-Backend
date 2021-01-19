const router = require("express").Router();

const Profiles = require("./profilesModel.js");

router.get("/", async (req, res) => {
  try {
    const profiles = await Profiles.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.log("Get profiles error : ", error);
    res.status(500).json({ message: "Error getting profiles. ", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profiles.findById(req.params.id);
    const needs = await Profiles.findProfileNeeds(req.params.id);
    const wants = await Profiles.findProfileWants(req.params.id);
    if (profile) {
      res.status(200).json({ ...profile, needs, wants });
    } else {
      res
        .status(404)
        .json({ message: "The profile with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Get profile by id error : ", error);
    res.status(500).json({ message: "Error getting that profile.", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const profile = await Profiles.insert(req.body);
    res.status(201).json({ message: "Profile successfully created." });
  } catch (error) {
    console.log("Create profile error : ", error);
    res.status(500).json({ message: "Error creating that profile.", error });
  }
});

router.put("/:id", async (req, res) => {
  const profile = req.body;
  try {
    const updatedProfile = await Profiles.update(req.params.id, profile);
    if (profile) {
      res.status(200).json({ message: "Profile successfullly updated." });
    } else {
      res
        .status(404)
        .json({ message: "The profile with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Update profile error : ", error);
    res.status(500).json({ message: "Error updating that profile.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Profiles.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The profile has been removed",
      });
    } else {
      res.status(404).json({
        message: "The profile with the specified ID does not exist.",
      });
    }
  } catch (error) {
    console.log("Delete profile error : ", error);
    res.status(500).json({ message: "Error deleting that profile.", error });
  }
});

module.exports = router;
