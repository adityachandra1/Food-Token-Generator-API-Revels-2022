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

router.get("/getstats", isAdminLoggedIn, async (req, res) => {
  try {
    const accessLevel = req.accessLevel;
    const categoryName = req.categoryName;
    const categoryId = req.categoryId;

    console.log("ACCESSLVL", accessLevel);
    console.log("CATNAME", categoryName);
    if (accessLevel >= 4) {
      const categories = await Category.find({});
      let tokens_given_by_SC = 0;
      let stats = [];
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
          category: cat.category,
          tokensExpired: tokens_expired,
          tokensRedeemed: tokens_redeemed,
          tokensGiven: tokens_given,
          tokensGivenBySC: tokens_given_by_SC,
        };

        stats.push(statsObj);
      }
      res.send({ stats: stats, timestamp: new Date().toLocaleString() });
    } else if (accessLevel == -1) {
      // only send stats of the category
      const volunteers = await Volunteer.find({ category: categoryId });
      let tokens_expired = 0,
        tokens_redeemed = 0,
        tokens_given = 0,
        tokens_given_by_SC = 0;

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
        category: categoryName,
        tokensExpired: tokens_expired,
        tokensRedeemed: tokens_redeemed,
        tokensGiven: tokens_given,
        tokensGivenBySC: tokens_given_by_SC,
      };
      let statsArr = [];
      statsArr.push(statsObj);

      res.send({ stats: statsArr, timestamp: new Date().toLocaleString() });
    } else {
      res.send({
        msg: "You do not have access to this route",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
