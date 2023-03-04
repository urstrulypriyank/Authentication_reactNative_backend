const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "token invalid Login Again" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });

};
