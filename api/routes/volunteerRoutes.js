const express = require('express');
const { count } = require('../models/VolunteerModel');
const router = express();
const Volunteer = require('../models/VolunteerModel');

router.post("/createvolunteer", async(req, res) => {
    const { name, email, role, category } = req.body;
    try {
        const volunteer = await Volunteer.create({ name, email, role, category });
        res.send("successfully registered");
    } catch (err) {
        console.log(err);
        res.status(400, "Error while creating Admin");
    }
});

router.get("/getvolunteers", async(req, res) => {
    const category = req.body;
    let volunteers = [];
    if (category.length != undefined) {
        volunteers = await Volunteer.find({ category: category });
    } else {
        volunteers = await Volunteer.find({});
    }
    res.send(volunteers);
});

module.exports = router;