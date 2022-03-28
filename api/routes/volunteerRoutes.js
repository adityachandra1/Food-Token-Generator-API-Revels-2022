const express = require('express');
const { count } = require('../models/VolunteerModel');
const router = express();
const Volunteer = require('../models/VolunteerModel');
const Category = require('../models/CategoryModel');

router.post("/createvolunteer", async(req, res) => {
    const { name, email, role, categoryName } = req.body;
    // Category db not fully populated
    const cat = await Category.findOne({ category: categoryName });
    try {
        const volunteer = await Volunteer.create({ name, email, role });
        console.log(volunteer);
        res.send("Successfully registered");
    } catch (err) {
        console.log(err);
        res.status(400, "Error while creating Admin");
    }
});

router.get("/getvolunteers", async(req, res) => {
    const categoryName = req.body;
    let volunteers = [];
    if (categoryName.length != undefined) {
        volunteers = await Volunteer.find({ category: { category: categoryName } });
    } else {
        volunteers = await Volunteer.find({});
    }
    res.send(volunteers);
});

module.exports = router;