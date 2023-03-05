const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

router.post("/signup", (req, res) => {
  try {
    // cornsole.log("data received" + req.body);
    const { name, email, password, dob } = req.body;
    if (!name || !password || !email || !dob)
      return res
        .status(422)
        .send({ error: "Please fill all the fields correctly" });
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser)
        return res.status(422).send({ error: "Invalid credentials" });
      const user = new User({
        name,
        email,
        password,
        dob,
      });
      try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.send({ message: "User saved sucessfully", token: token });
      } catch (error) {
        return res
          .status(422)
          .send({ error: "internal server error unable to create user" });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .send({ error: "internal server error unable to create user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "all fields are mandatory" });
  }
  console.log(email + " " + password);
  const savedUser = await User.findOne({ email: email });
  //  If the user doesnot exist
  if (!savedUser) return res.status(400).send({ error: "Invalid credential" });

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET);
        console.log("password matched");
        return res.status(200).send({ token });
      } else {
        return res.status(400).send({ error: "Invalid credential" });
      }
    });
  } catch (err) {}
});

module.exports = router;
