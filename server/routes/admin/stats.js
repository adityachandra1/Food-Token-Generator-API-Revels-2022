const { Category } = require('../../models/category');
const { FoodToken } = require('../../models/foodToken');

//superadmin
const getStats = async (req, res) => {
  try {
    if (req.category.categoryId == 'superadmin') {
      const categories = await Category.find().exec();
      let arr = [];
      let totalissuedcnt = 0;
      //how many tokens in in foodtoken collection
      const tokens = await FoodToken.find().exec();

      categories.forEach((category) => {
        arr.push({
          categoryName: category.categoryName,
          tokensIssued: category.tokensIssued,
        });
        totalissuedcnt += category.tokensIssued;
      });
      return res.json({
        success: true,
        data: arr,
        totalissuedcnt,
        totalredeemedcnt: totalissuedcnt - tokens.length,
        totalactivecnt: tokens.length,
      });
    } else {
      return res.json({
        success: false,
        message: 'You are not authorized to view this page',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

//category wise get how many tokens issued
const getCategoryStats = async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryId: req.category.categoryId,
    });
    const tokens = await FoodToken.find({
      issuedBy: category.categoryName,
    }).exec();
    return res.json({
      success: true,
      data: tokens,
      msg: 'Successfully fetched data',
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { getStats, getCategoryStats };
