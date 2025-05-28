const User = require("../models/user.model");

exports.getUser = async (id) => {
  return await User.findById(id).select("-password");
};

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.updateUser = async (body) => {
  const updated = await User.findByIdAndUpdate(body._id, body, {
    new: true,
  }).select("-password");

  return updated;
};
