const router = require("express").Router();
const Resume = require("../models/Resume");

//CREATE RESUME
router.post("/", async (req, res) => {
  let count = 0;
  const newResume = new Resume({ ...req.body, updateCount: count });

  try {
    const savedResume = await newResume.save();
    res.status(200).json(savedResume);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE RESUME
router.put("/", async (req, res) => {
  try {
    const resume = await Resume.findOne();

    try {
      const updatedResume = await Resume.findOneAndUpdate(
        resume._id,
        {
          $set: { url: req.body.url },
          $inc: { "updateCount": 1 },
        },
        { new: true }
      );
      res.status(200).json(updatedResume);
    } catch (err) {
      res.status(500).json(err);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET RESUME 
router.get("/", async (req, res) => {

  try {
    const resume = await Resume.findOne();
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
