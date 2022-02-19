const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const { verifyJwtInUser } = require('../utils/jwt.js');
const {
  register,
  login,
  logout,
  getCategoryFromToken,
} = require('./admin/auth.js');
const { getStats, getCategoryStats } = require('./admin/stats.js');

router.get('/test', (req, res) => {
  res.send({ message: 'For Testing' });
});
const { Category, Token } = require('../models/category');
const { FoodToken } = require('../models/foodToken');
const sendEmail = require('../utils/email');

//ADMIN ROUTES
router.get('/categories/register', register);
router.post('/admin/login', login);
router.post('/admin/logout', logout);
router.get('/admin/category/:token', verifyJwtInUser, getCategoryFromToken);
router.get('/admin/catstats', verifyJwtInUser, getCategoryStats);
//superadmin can see all categories who issue how many token
router.get('/admin/stats', verifyJwtInUser, getStats);

//MAIN ROUTES

//SEND MAIL WITH QR URL
router.post('/generateqr', verifyJwtInUser, async (req, res) => {
  try {
    let uniquetoken = nanoid();
    const category = await Category.findOne({
      categoryId: req.category.categoryId,
    });
    let link = 'https://www.google.com/search?q=' + uniquetoken;
    const item = new FoodToken({
      qrLink: link,
      issuedTo: req.body.email,
      issuedBy: req.category.categoryName,
    });
    await item.save();
    //increment issuedtoken in category model
    category.tokensIssued += 1;
    await category.save();

    sendEmail(req.body.email, 'Food Token', item.qrLink);
    return res.send({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
});

//REDEEM TOKEN FROM CAFETERIA
router.post('/redeemtoken', verifyJwtInUser, async (req, res) => {
  try {
    const token = await FoodToken.findOne({ qrLink: req.body.qrLink });
    if (!token) {
      return res
        .status(404)
        .json({ message: 'Food Token not found or has already been redeemed' });
    }
    //delete token from foodtoken model
    await FoodToken.deleteOne({ qrLink: req.body.qrLink });
    return res.send({
      success: true,
      data: token,
      msg: 'Token deleted from DB',
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
