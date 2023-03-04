const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

router.post("/signUp", (req, res) => {
  try {
    // cornsole.log("data received" + req.body);
    const { name, email, password, dob } = req.body;
    if (!name || !password || !email || !dob)
      return res
        .status(422)
        .send({ error: "Please fill all the fields correctly" });
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) return res.status(422).send({ error: "Invalid credentials" });
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





module.exports = router;
