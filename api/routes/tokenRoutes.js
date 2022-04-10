const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const QRCode = require("qrcode");
var toSJIS = require("qrcode/helper/to-sjis");

const Volunteer = require("../models/VolunteerModel");
const Category = require("../models/categoryModel");
const {
  hasSuperAdminAccess,
  hasHRAccess,
} = require("../middlewares/accessLevel");
const { isAdminLoggedIn } = require("../middlewares/auth");

const { isHFS } = require("../middlewares/category");
const mailer = require("../middlewares/ses");
const maxAge = 3 * 60 * 60 * 1000;
const limit = 12 * 60 * 60 * 1000;
const createToken = (email) => {
  return jwt.sign({ email }, "HFS", { expiresIn: maxAge });
};

router.post("/create-token", isAdminLoggedIn, hasHRAccess, async (req, res) => {
  try {
    let email_list = req.body.email;
    const emails = email_list.map((element) => element.email);
    for (const email of emails) {
      const foodToken_jwt = createToken(email);
      let link = "https://www.google.com/search?q=" + foodToken_jwt;
      const volun = await Volunteer.findOne({ email: email });
      const tokens_list = volun.foodTokens;
      console.log(volun);
      if (
        tokens_list.length > 0 &&
        tokens_list[tokens_list.length - 1].issueTime - Date.now() < limit &&
        volun.role == "VOLUNTEER"
      ) {
        continue;
      }

      const obj = {
        issueTime: Date.now(),
        token: foodToken_jwt,
        isRedeemed: false,
        redeemTime: "",
        isSC: false,
      };

      let img = await QRCode.toDataURL(link);
      let body = '<h2>Your Token</h2></br> <img src="' + img + '">';
      let em = await mailer.sendEmailNotif(
        email,
        "FOOD TOKEN",
        body,
        "FOOD TOKEN"
      );
      console.log(img);
      tokens_list.push(obj);
      await Volunteer.findOneAndUpdate(
        { email: email },
        { foodTokens: tokens_list }
      );
      console.log(tokens_list);
      console.log(volun);
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.toString() });
  }
});

//access
router.post("/token-tester", async (req, res) => {
  try {
    const { email } = req.body;
    const foodToken_jwt = createToken(email);
    let link = "https://www.google.com/search?q=" + foodToken_jwt;
    const volun = await Volunteer.findOne({ email: email });
    const tokens_list = volun.foodTokens;
    // const check = tokens_list[tokens_list.length - 1].issueTime - Date.now();
    const obj = {
      issueTime: Date.now(),
      token: foodToken_jwt,
      isRedeemed: false,
      redeemTime: "",
      isSC: true,
    };

    let img = await QRCode.toDataURL(link);
    let body = '<h2>Your Token</h2></br> <img src="' + img + '">';
    let em = await mailer.sendEmailNotif(
      email,
      "FOOD TOKEN",
      body,
      "FOOD TOKEN"
    );
    tokens_list.push(obj);
    await Volunteer.findOneAndUpdate(
      { email: email },
      { foodTokens: tokens_list }
    );
    return res.status(200).json({ message: "Success", data: body });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.toString() });
  }
});

//add hfs check logged in here
router.post("/redeem-token", async (req, res) => {
  try {
    const toBeRedeemed = req.query.token;
    const payload = jwt.verify(toBeRedeemed, "HFS");
    const volun = await Volunteer.findOne({ email: payload.email });
    const tokens_list = volun.foodTokens;
    for (obj in tokens_list) {
      if (obj.token == toBeRedeemed) {
        isRedemeed = true;
        redeemTime = Date.now();
      }
    }
    await Volunteer.findOneAndUpdate(
      { email: payload.email },
      { foodTokens: tokens_list }
    );
    return res
      .status(200)
      .json({ message: "Token Redeemed! for email : " + payload.email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.toString() });
  }
});

module.exports = router;
