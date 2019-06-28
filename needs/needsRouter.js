const router = require("express").Router();

const Needs = require("./needsModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

// router.get("/", restricted, async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const needs = await Needs.find();
    res.status(200).json(needs);
  } catch (error) {
    console.log("Get needs error : ", error);
    res.status(500).json({ message: "Error getting needs.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const need = await Needs.findById(req.params.id);
    if (need) {
      res.status(200).json(need);
    } else {
      res
        .status(404)
        .json({ message: "The need with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Get need by id error : ", error);
    res.status(500).json({ message: "Error getting that need.", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const need = await Needs.insert(req.body);
    res.status(201).json({ message: "Need successfully created." });
  } catch (error) {
    console.log("Create need error : ", error);
    res.status(500).json({ message: "Error creating that need.", error });
  }
});

router.put("/:id", async (req, res) => {
  const need = req.body;
  try {
    const updatedNeed = await Needs.update(req.params.id, need);
    if (need) {
      res.status(200).json({ message: "Need successfullly updated." });
    } else {
      res
        .status(404)
        .json({ message: "The need with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Update need error : ", error);
    res.status(500).json({ message: "Error updating that need.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Needs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The need has been removed"
      });
    } else {
      res.status(404).json({
        message: "The need with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log("Delete need error : ", error);
    res.status(500).json({ message: "Error deleting that need.", error });
  }
});

module.exports = router;
