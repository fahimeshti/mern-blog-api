const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new Admin({
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Admin.findOne();
    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      res.status(400).json("Wrong credentials!");
    } else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
