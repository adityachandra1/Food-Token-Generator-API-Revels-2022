const express = require("express");
const { count, findOne } = require("../models/VolunteerModel");
const router = express();
const Volunteer = require("../models/VolunteerModel");
const Category = require("../models/categoryModel");
const {
  hasSuperAdminAccess,
  hasHRAccess,
} = require("../middlewares/accessLevel");
const { isAdminLoggedIn } = require("../middlewares/auth");
const { isHFS } = require("../middlewares/category");

router.post("/create-volunteer", isAdminLoggedIn, async (req, res) => {
  try {
    const { name, email, role, category } = req.body;
    // Category db not fully populated
    const cat = await Category.findOne({ category: category });
    const item = await Volunteer.create({
      name,
      email,
      role,
      category: cat._id,
    });
    console.log(item);
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(400, "Error while creating Admin");
  }
});

router.get("/get-volunteers-by-cat", isAdminLoggedIn, hasHRAccess,
  async (req, res) => {
    try {
      console.log("LMAOOO", req.categoryName);
      const categoryName = req.categoryName;
      let volunteers = [];
      const cat = await Category.findOne({ category: categoryName });
      if (cat != null) {
        volunteers = await Volunteer.find({ category: cat._id });
      } else {
        volunteers = await Volunteer.find({});
      }
      res.send(volunteers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  }
);

module.exports = router;
