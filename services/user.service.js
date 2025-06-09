const User = require("../models/user.model");

exports.getUser = async (id) => {
  try {
    return await User.findById(id).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find().select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllConnections = async (userId) => {
  try {
    return User.findById(userId)
      .populate("connections", "name email profilePic")
      .select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUser = async (body) => {
  try {
    const updated = await User.findByIdAndUpdate(body._id, body, {
      new: true,
    }).select("-password");

    return updated;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteUser = async (id) => {
  try {
    const deleted = await User.deleteOne({ _id: id });
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};
