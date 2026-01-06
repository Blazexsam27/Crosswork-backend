const Community = require("../models/community.model");

exports.getAllCommunities = async () => {
  try {
    return await Community.find();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommunityById = async (communityId) => {
  try {
    return await Community.findById(communityId).populate(
      "moderators",
      "name email profilePic"
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommunityByName = async (name) => {
  try {
    return await Community.findOne({ name }).populate(
      "moderators",
      "name email profilePic"
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.createCommunity = async (communityData) => {
  try {
    const moderator = communityData.moderators;
    communityData.moderators = [moderator];

    const rules = communityData.rules ? JSON.parse(communityData.rules) : [];
    const tags = communityData.tags ? JSON.parse(communityData.tags) : [];

    communityData.rules = rules;
    communityData.tags = tags;

    const community = new Community(communityData);
    return await community.save();
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateCommunity = async (id, updatedData) => {
  try {
    // Parse JSON strings if present
    if (updatedData.rules && typeof updatedData.rules === "string") {
      updatedData.rules = JSON.parse(updatedData.rules);
    }
    if (updatedData.tags && typeof updatedData.tags === "string") {
      updatedData.tags = JSON.parse(updatedData.tags);
    }

    return await Community.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate("moderators", "name email profilePic");
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteCommunity = async (communityId) => {
  try {
    return await Community.findByIdAndDelete(communityId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.searchCommunities = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const searchRegex = new RegExp(query, "i"); // case-insensitive search

    return await Community.find({
      $or: [
        { communityName: searchRegex },
        { description: searchRegex },
        { tags: searchRegex },
      ],
    })
      .select("communityName description membersCount communityIcon category")
      .limit(10)
      .sort({ membersCount: -1 }); // Sort by popularity
  } catch (error) {
    throw new Error(error);
  }
};
