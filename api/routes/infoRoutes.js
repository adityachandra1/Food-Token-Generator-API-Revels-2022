//get user
//get cat

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const Volunteer = require('../models/VolunteerModel');
const Category = require('../models/categoryModel');
const { hasSuperAdminAccess, hasHRAccess } = require('../middlewares/accessLevel');
const { isAdminLoggedIn } = require('../middlewares/auth');
const { isHFS } = require('../middlewares/category');



router.get('/info-volunteer', isAdminLoggedIn, async(req, res) => {
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

router.get('/get-admin-category', isAdminLoggedIn, async(req, res) => {
    try {
        const user = req.requestAdmin;
        const categoryId = user.role.categoryId;
        const categoryName = Category.findOne({ category: categoryName });
        res.json({ "categoryId": categoryId, "categoryName": categoryName });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
});

module.exports = router;