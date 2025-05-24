const jwt = require("jsonwebtoken");

exports.generateJwt = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
