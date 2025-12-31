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

exports.joinCommunity = async (userId, communityId) => {
  try {
    const user = await User.findById(userId);
    if (!user.communities.includes(communityId)) {
      user.communities.push(communityId);
      await user.save();
    }

    // Update community member count
    const Community = require("./community.model");
    await Community.findByIdAndUpdate(communityId, {
      $inc: { membersCount: 1 },
    });

    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.leaveCommunity = async (userId, communityId) => {
  try {
    const user = await User.findById(userId);
    user.communities = user.communities.filter(
      (id) => id.toString() !== communityId
    );
    await user.save();

    // Update community member count
    const Community = require("./community.model");
    await Community.findByIdAndUpdate(communityId, {
      $inc: { membersCount: -1 },
    });

    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};
