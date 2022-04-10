// category stats
const express = require("express");
const router = express();
const Volunteer = require("../models/VolunteerModel");
const Category = require("../models/categoryModel");
const {
  hasSuperAdminAccess,
  hasHRAccess,
} = require("../middlewares/accessLevel");
const { isAdminLoggedIn } = require("../middlewares/auth");
const { isHFS } = require("../middlewares/category");

const tokenAge = 3 * 60 * 60 * 1000;

<<<<<<< HEAD
router.get("/getstats", isAdminLoggedIn, async(req, res) => {
    try {
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
                    if (!token.isSC) {
                        tokens_given++;
                    } else {
                        tokens_given_by_SC++;
                    }
                    if (token.isRedeemed) tokens_redeemed++;
                    if (!token.isRedeemed && (token.issueTime.getTime() + tokenAge) < Date.now()) tokens_expired++;
                });
            });
            stats[cat.category]["tokensExpired"] = tokens_expired;
            stats[cat.category]["tokensRedeemed"] = tokens_redeemed;
            stats[cat.category]["tokensGiven"] = tokens_given;
            stats[cat.category]["tokensGivenBySC"] = tokens_given_by_SC;
        };
        res.send({ "stats": stats, "timestamp": new Date().toLocaleString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
=======
router.get("/getstats", isAdminLoggedIn, async (req, res) => {
  const categories = await Category.find({});
  let stats = {};
  for (const cat of categories) {
    const volunteers = await Volunteer.find({ category: cat["_id"] });
    let tokens_expired = 0,
      tokens_redeemed = 0,
      tokens_given = 0;
    stats[cat.category] = {};
    volunteers.forEach(function (vol) {
      vol.foodTokens.forEach(function (token) {
        if (!token.isSC) {
          tokens_given++;
        } else {
          tokens_given_by_SC++;
        }
        if (token.isRedeemed) tokens_redeemed++;
        if (
          !token.isRedeemed &&
          token.issueTime.getTime() + tokenAge < Date.now()
        )
          tokens_expired++;
      });
    });
    stats[cat.category]["tokensExpired"] = tokens_expired;
    stats[cat.category]["tokensRedeemed"] = tokens_redeemed;
    stats[cat.category]["tokensGiven"] = tokens_given;
    stats[cat.category]["tokensGivenBySC"] = tokens_given_by_SC;
  }
  res.send({ stats: stats, timestamp: new Date().toLocaleString() });
>>>>>>> 47c410093076eb62651f61cddf6bee9187df5cda
});

module.exports = router;
