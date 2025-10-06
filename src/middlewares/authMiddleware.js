const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');

exports.authMiddleware = async (req, res, next) => {
  try {
    // Check if token exists in header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, code: 401, message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const user = await userRepository.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ success: false, code: 401, message: 'User not found' });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      role: user.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, code: 401, message: 'Token is not valid' });
  }
};