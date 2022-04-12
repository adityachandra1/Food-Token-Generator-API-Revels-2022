const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const tokenRoutes = require("./routes/tokenRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const statRoutes = require("./routes/statRoutes");
const infoRoutes = require("./routes/infoRoutes");
const authRoutes = require("./routes/authRoutes");

const Role = require("./models/Role.js");

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.DB_URI ||
      "mongodb+srv://dbuser:dbuser@cluster0.ujfux.mongodb.net/TestingRevels22?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(app.listen(PORT))
  .then(console.log("Connected to DB\nListening to port " + PORT))
  .catch((err) => console.log(err));

app.get("/api", function (req, res) {
  res.send("Hello World!");
});

app.use("/api", tokenRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", statRoutes);
app.use("/api", infoRoutes);
app.use("/api", authRoutes);
