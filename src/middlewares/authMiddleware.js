const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const authMiddleware = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: '未授權：請先登入' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findByPk(decoded.id);
    
    if (!currentUser) {
      return res.status(401)
    }

    req.user = currentUser;

    next();

  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token 已過期，請重新登入' });
    }
    return res.status(401).json({ success: false, message: 'Token 無效或驗證失敗' });
  }
};

module.exports = authMiddleware;