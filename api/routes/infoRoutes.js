//get user
//get cat

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const Volunteer = require('../models/VolunteerModel');
const Category = require('../models/categoryModel');


router.get('/info-volunteer', async (req, res) => {
    try {
        const toBeRedeemed = req.query.token;
        const payload = jwt.verify(toBeRedeemed, 'HFS');
        const volun = await Volunteer.findOne({ 'email': payload.email });
        const cat = await Category.findById(volun.category);
        res.json({"name": volun.name, "email": volun.email, "role": volun.role,  "tokensIssued": volun.foodTokens.length, "category": cat.category});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
});

module.exports = router;