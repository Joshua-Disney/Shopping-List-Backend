const router = require("express").Router();

const Wants = require("./wantsModel.js");

router.get("/", async (req, res) => {
  try {
    const wants = await Wants.find();
    res.status(200).json(wants);
  } catch (error) {
    console.log("Get wants error : ", error);
    res.status(500).json({ message: "Error getting wants.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const want = await Wants.findById(req.params.id);
    if (want) {
      res.status(200).json(want);
    } else {
      res
        .status(404)
        .json({ message: "The want with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Get want by id error : ", error);
    res.status(500).json({ message: "Error getting that want.", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const want = await Wants.insert(req.body);
    res.status(201).json({ message: "Want successfully created." });
  } catch (error) {
    console.log("Create want error : ", error);
    res.status(500).json({ message: "Error creating that want.", error });
  }
});

router.put("/:id", async (req, res) => {
  const want = req.body;
  try {
    const updatedWant = await Wants.update(req.params.id, want);
    if (want) {
      res.status(200).json({ message: "Want successfullly updated." });
    } else {
      res
        .status(404)
        .json({ message: "The want with the specified ID does not exist." });
    }
  } catch (error) {
    console.log("Update want error : ", error);
    res.status(500).json({ message: "Error updating that want.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Wants.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The want has been removed",
      });
    } else {
      res.status(404).json({
        message: "The want with the specified ID does not exist.",
      });
    }
  } catch (error) {
    console.log("Delete want error : ", error);
    res.status(500).json({ message: "Error deleting that want.", error });
  }
});

module.exports = router;
