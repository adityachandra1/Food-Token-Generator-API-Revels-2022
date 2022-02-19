const jwt = require('jsonwebtoken');
const { Category, Token } = require('../models/category');

const generateAuthJwt = async (category) => {
  try {
    const payload = {
      categoryId: category.categoryId,
      category: category.category,
    };

    const signedToken = await jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: '1h',
    });

    return {
      token: 'Bearer ' + signedToken,
      expiresIn: '1h',
    };
  } catch (error) {
    return error;
  }
};

const verifyJwtInUser = async (req, res, next) => {
  try {
    const bearerToken = req.headers['authorization'];
    if (bearerToken) {
      const tokenArray = bearerToken.split(' ');
      const token = tokenArray[1];
      const category = await jwt.verify(token, process.env.AUTH_SECRET);
      if (category) {
        if (!(await Token.exists({ token: token }))) {
          throw new Error(
            'No User exists with given web token Or Invalid Web Token'
          );
        }
        const catExists = await Category.exists({
          categoryId: category.categoryId,
        });
        if (catExists) {
          req.category = category;
          next();
        } else {
          throw new Error(
            'No User exists with given web token Or Invalid Web Token'
          );
        }
      } else {
        return res.status(403).json({
          message: 'Not a valid token',
        });
      }
    } else {
      return res.status(403).json({
        message: 'No token recieved',
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  generateAuthJwt: generateAuthJwt,
  verifyJwtInUser: verifyJwtInUser,
};
