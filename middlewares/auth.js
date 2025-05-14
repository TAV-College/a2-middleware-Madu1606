const jwt = require("jsonwebtoken");
const SECRET = "yourSecretKey";

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ msg: "Token error" });
  }

  const token = parts[1];
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    req.user = payload; 
    next();
  });
};
