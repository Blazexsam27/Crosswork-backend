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
    return await Community.findById(communityId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommunityByName = async (name) => {
  try {
    return await Community.findOne({ name });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createCommunity = async (communityData) => {
  try {
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
