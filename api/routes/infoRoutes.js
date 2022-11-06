const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require("mongoose");

const Volunteer = require('../models/VolunteerModel');
const Category = require('../models/categoryModel');
const { hasSuperAdminAccess, hasHRAccess } = require('../middlewares/accessLevel');
const { isAdminLoggedIn } = require('../middlewares/auth');
const { isHFS } = require('../middlewares/category');



router.get('/info-volunteer', isAdminLoggedIn, async (req, res) => {
    try {
        const toBeRedeemed = req.query.token;
        const payload = jwt.verify(toBeRedeemed, 'HFS');
        const volun = await Volunteer.findOne({ 'email': payload.email });
        const cat = await Category.findById(volun.category);
        res.json({ "name": volun.name, "email": volun.email, "role": volun.role, "tokensIssued": volun.foodTokens.length, "category": cat.category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
});

router.get('/get-admin-category', isAdminLoggedIn, async (req, res) => {
    try {
        const user = req.requestAdmin;
        const categoryId = user.role.categoryId;
        const category = await Category.findOne({ _id: categoryId });
        res.json({ "categoryId": categoryId, "categoryName": category.category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
});

router.get('/fix', async (req, res) => {
    const newId = req.params.new;

    try {
        const allVolunteers = await Volunteer.find({});

        allVolunteers.forEach((volunteer) => {
            console.log(volunteer);
            volunteer.category = mongoose.Types.ObjectId(newId);
            console.log(volunteer);
            volunteer.save();
        })
        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;