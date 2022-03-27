const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URI || 'mongodb+srv://admin:admin123@cluster0.gqru4.mongodb.net/hfs-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(app.listen(PORT))
    .then(console.log("Connected to DB\nListening to port " + PORT))
    .catch((err) => console.log(err));


app.get("/", function (req, res) {
    res.send("Great World!");
});


