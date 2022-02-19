const { Category } = require('../../models/category');
const sendEmail = require('../../utils/email');
const credTemplate = require('../../utils/creds');
const categories = require('../../utils/categories');

const creds = async (req, res) => {
  try {
    let emails = [];
    categories.forEach((cat) => {
      emails.push(cat.email);
    });
    const categories = await Category.find(
      { email: emails },
      {
        category: 1,
        email: 1,
        password: 1,
        categoryId: 1,
      }
    );
    // console.log(categories.length);
    for (var i = 0; i < 10; i++) {
      cat = categories[i];
      console.log(cat.email);
      const message = credTemplate(cat.category, cat.categoryId, cat.password);
      sendEmail(
        cat.email,
        "Credentials: Food Token Portal- REVELS '22",
        message
      );
    }
    return res.json({
      success: true,
      msg: 'Successfully Sent Credentials!',
    });
  } catch (error) {
    return res.json({ success: false, message: error.toString() });
  }
};

module.exports = {
  creds,
};
