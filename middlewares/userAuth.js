const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    // Get token from cookies
    const { userToken } = req.cookies;

    // Check if have the cookie
    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: "user not autherized",
      });
    }
    // Token verification
    const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        message: "user not autherized",
      });
    }
    // If have token send the token as a object
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "faild",
    });
  }
};
module.exports = { userAuth };
