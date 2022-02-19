const { Category, Token } = require('../../models/category');
const bcrypt = require('bcryptjs');
const jwtUtils = require('../../utils/jwt');
const categories = require('../../utils/categories');

const register = async (req, res) => {
  try {
    categories.forEach(async (cat) => {
      const result = Math.random().toString(36).substring(2, 7);
      const pass = cat.id + '_' + result;
      // const salt = await bcrypt.genSalt(10);
      // const hash = await bcrypt.hash(pass, salt);
      const newCategory = new Category({
        categoryId: cat.id,
        category: cat.title,
        email: cat.email,
        password: pass,
        token: null,
      });
      await newCategory.save();
    });
    return res.status(200).json({
      message: {
        message: 'Categories Successfully Registered',
        success: true,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString(), success: false });
  }
};

const login = async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryId: req.body.categoryId,
    });

    if (!category) return res.status(401).json({ message: 'Invalid category' });

    const isValid = req.body.password == category.password;

    if (!isValid) return res.status(401).json({ message: 'Invalid password' });

    const jwt = await jwtUtils.generateAuthJwt(category);

    const tokenArray = jwt.token.split(' ');

    const jwtToken = tokenArray[1];

    const token = await Token.findOneAndUpdate(
      { categoryId: category._id },
      { token: jwtToken },
      { new: true, upsert: true }
    );

    category.token = jwtToken;
    await category.save();

    return res.status(200).json({
      message: 'Category Signed in Successfully ',
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const logout = async (req, res) => {
  try {
    const bearerToken = req.headers['authorization'];
    const tokenArray = bearerToken.split(' ');
    const token = tokenArray[1];
    await Token.findOneAndDelete({ token: token });
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    return res.status(500).json({ message: error.toString() });
  }
};

const getCategoryFromToken = async (req, res) => {
  try {
    const token = req.params.token;
    const category = await Category.findOne({ token: token }).select(
      '-password'
    );
    if (category) return res.send({ success: true, data: category });
    else return res.send({ success: false, data: 'Invalid Token' });
  } catch (error) {
    return res.send({ success: false, message: 'Something went wrong.' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCategoryFromToken,
};
