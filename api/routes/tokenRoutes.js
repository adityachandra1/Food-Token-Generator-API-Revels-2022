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

router.get("/get-eligible-volunteers", async (req, res) => {
  const { categoryName } = req.body;
  let volunteers = [];
  const cat = await Category.findOne({ category: categoryName });
  if (cat != null) {
    volunteers = await Volunteer.find({ category: cat["_id"] });
  } else {
    volunteers = await Volunteer.find({});
  }
  res.send(volunteers);
});

router.post("/create-token", isAdminLoggedIn, hasHRAccess, async (req, res) => {
  try {
    let email_list = req.body.email;
    const emails = email_list.map((element) => element.email);
    console.log(emails);
    let error_list = new Array();
    console.log(emails);

    for (const email of emails) {
      const foodToken_jwt = createToken(email);
      let link = foodToken_jwt;
      const volun = await Volunteer.findOne({ email: email });
      const tokens_list = volun.foodTokens;
      // console.log(volun);
      if (
        tokens_list.length > 0 &&
        Date.now() - tokens_list[tokens_list.length - 1].issueTime < limit &&
        volun.role == "VOLUNTEER"
      ) {
        error_list.push(volun.email);
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
      // console.log(img);
      let body = ` <h1>Your Food Token</h1>
            <img class="image-div" src="${img}" alt="${img}"/>
            <br>
            <small class="subtitle">Expires in 3 hrs</small>
            <br>
            <small>For any queries contact your CCs</small>
            <small></small>
            <br>
            <h3 class="footer">Sent by System Admin , Revels 2022 ?????? </h3>`;
      // console.log(body);
      // let body = '<h1>Hi</h1>';
      let em = await mailer.sendEmailNotif(
        email,
        "FOOD TOKEN",
        body,
        "FOOD TOKEN"
      );
      console.log(em);
      // console.log(img);
      tokens_list.push(obj);
      await Volunteer.findOneAndUpdate(
        { email: email },
        { foodTokens: tokens_list }
      );
      // console.log(tokens_list);
      // console.log(volun);
    }
    return res.status(200).json({ message: "Success", error_list: error_list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.toString() });
  }
});

//access
router.post("/token-tester", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const foodToken_jwt = createToken(email);
    let link = foodToken_jwt;
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
    let body = ` <h1>Your Food Token</h1>
    <img class="image-div" src="${img}" alt="${img}"/>
    <br>
    <small class="subtitle">Expires in 3 hrs</small>
    <br>
    <small>For any queries contact your CCs</small>
    <small></small>
    <br>
    <h3 class="footer">Sent by System Admin , Revels 2022 ?????? </h3>`;
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
router.get("/redeem-token", isAdminLoggedIn, async (req, res) => {
  try {
    const toBeRedeemed = req.query.token;
    const payload = jwt.verify(toBeRedeemed, "HFS");
    const volun = await Volunteer.findOne({ email: payload.email });
    const tokens_list = volun.foodTokens;
    console.log(volun);
    for (let i = 0; i < tokens_list.length; i++) {
      let obj = tokens_list[i];
      console.log(obj);
      if (obj.token == toBeRedeemed) {
        // console.log(obj);
        if (obj.isRedeemed == true) {
          return res.status(400).json({ message: "Token already redeemed!" });
        }
        obj.isRedeemed = true;
        obj.redeemTime = Date.now();
        // console.log(obj);
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
    return res.status(400).json({ message: err.toString() });
  }
});

module.exports = router;
