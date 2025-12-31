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
    return await Community.findOneAndUpdate({ id }, updatedData, { new: true });
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
