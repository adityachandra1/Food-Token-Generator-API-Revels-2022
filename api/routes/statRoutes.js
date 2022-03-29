// category stats
const express = require('express');
const router = express();
const Volunteer = require('../models/VolunteerModel');
const Category = require('../models/categoryModel');
const {hasSuperAdminAccess, hasHRAccess} = require('../middlewares/accessLevel');
const {isAdminLoggedIn} = require('../middlewares/auth');
const {isHFS} = require('../middlewares/category');

const tokenAge = 3 * 60 * 60 * 1000;

router.get("/getstats", isAdminLoggedIn , async(req, res) => {
    const categories = await Category.find({});
    let stats = {};
    for (const cat of categories) {
        const volunteers = await Volunteer.find({ category: cat["_id"] });
        let tokens_expired = 0,
            tokens_redeemed = 0,
            tokens_given = 0;
        stats[cat.category] = {};
        volunteers.forEach(function(vol) {
            vol.foodTokens.forEach(function(token) {
                tokens_given++;
                if (token.isRedeemed) tokens_redeemed++;
                if (!token.isRedeemed && (token.issueTime.getTime() + tokenAge) < Date.now()) tokens_expired++;
            });
        });
        stats[cat.category]["tokensExpired"] = tokens_expired;
        stats[cat.category]["tokensRedeemed"] = tokens_redeemed;
        stats[cat.category]["tokensGiven"] = tokens_given;
    };
    res.send({ "stats": stats, "timestamp": new Date().toLocaleString() });
});

module.exports = router;