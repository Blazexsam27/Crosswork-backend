const User = require("../models/user.model");

exports.getUser = async (id) => {
  return await User.findById(id).select("-password");
};

exports.updateUser = async ({ id, body }) => {
  const updated = await User.findByIdAndUpdate(id, body, {
    new: true,
  }).select("-password");

  return updated;
};
