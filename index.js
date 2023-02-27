require("dotenv").config();
const express = require("express");
const port = process.env.PORT;

const app = express();
const bodyParser = require("body-parser");

// using database
require("./db");
require("./models/user");

// using middleware bodyParser to get data as in json format

app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server started on " + "http://localhost:" + port);
});
