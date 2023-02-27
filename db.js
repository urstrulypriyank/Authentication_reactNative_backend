const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log("could not connected to db", err);
  });
