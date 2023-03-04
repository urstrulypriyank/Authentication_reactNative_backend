require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT;
// using database
require("./db");
require("./models/user");

// database required in authRoutes
const authRoutes = require("./routes/authRoutes");
const requireToken = require("./middleware/AuthToken");

const app = express();

// using middleware bodyParser to get data as in json format
app.use(bodyParser.json());

// Routes
app.use(authRoutes);

app.get("/", requireToken,(req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server started on " + "http://localhost:" + port);
});
