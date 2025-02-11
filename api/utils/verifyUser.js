const { verify } = require('jsonwebtoken');
require('dotenv').config();

exports.verifyUser = (req, res, next) => {

  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Access denied! No token Found." });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "UnAuthorized! Invalid or expired token" });
  }
};
