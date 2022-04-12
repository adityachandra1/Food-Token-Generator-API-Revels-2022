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

router.get(
  "/getstats",
  /*isAdminLoggedIn,*/ async (req, res) => {
    try {
      const categories = await Category.find({});
      let tokens_given_by_SC = 0;
      let stats = [];
      let idx = 0;
      for (const cat of categories) {
        const volunteers = await Volunteer.find({ category: cat["_id"] });
        let tokens_expired = 0,
          tokens_redeemed = 0,
          tokens_given = 0;

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

        const statsObj = {
          category: cat,
          tokensExpired: tokens_expired,
          tokensRedeemed: tokens_redeemed,
          tokensGiven: tokens_given,
          tokensGivenBySC: tokens_given_by_SC,
        };

        stats.push(statsObj);
      }
      res.send({ stats: stats, timestamp: new Date().toLocaleString() });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  }
);

module.exports = router;
