const User = require("../models/user.model");

exports.getUser = async (id) => {
  try {
    return await User.findById(id).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserById = async (id) => {
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

exports.bookmarkPost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    if (!user.bookmarkedPosts.includes(postId)) {
      user.bookmarkedPosts.push(postId);
      await user.save();
    }
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.unbookmarkPost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    user.bookmarkedPosts = user.bookmarkedPosts.filter(
      (id) => id.toString() !== postId
    );
    await user.save();
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getBookmarkedPosts = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate({
        path: "bookmarkedPosts",
        populate: [
          { path: "author", select: "name profilePic" },
          { path: "community", select: "name communityIcon" },
        ],
      })
      .select("bookmarkedPosts");
    return user.bookmarkedPosts;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserCommunities = async (userId) => {
  try {
    const Community = require("../models/community.model");

    // Get communities where user is a member
    const user = await User.findById(userId).select("communities");
    const joinedCommunities = await Community.find({
      _id: { $in: user.communities },
    }).select(
      "communityName description membersCount communityIcon createdBy moderators"
    );

    // Get communities where user is owner or moderator
    const ownedOrModeratedCommunities = await Community.find({
      $or: [{ createdBy: userId }, { moderators: userId }],
    }).select(
      "communityName description membersCount communityIcon createdBy moderators"
    );

    // Combine and remove duplicates based on _id
    const allCommunities = [
      ...joinedCommunities,
      ...ownedOrModeratedCommunities,
    ];
    const uniqueCommunities = allCommunities.filter(
      (community, index, self) =>
        index ===
        self.findIndex((c) => c._id.toString() === community._id.toString())
    );

    return uniqueCommunities;
  } catch (error) {
    throw new Error(error);
  }
};

exports.searchUsers = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const searchRegex = new RegExp(query, "i"); // case-insensitive search

    return await User.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { bio: searchRegex },
        { interests: searchRegex },
        { university: searchRegex },
      ],
    })
      .select("name email profilePic bio university")
      .limit(10);
  } catch (error) {
    throw new Error(error);
  }
};
