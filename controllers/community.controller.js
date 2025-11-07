const communityService = require("../services/community.service");

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await communityService.getAllCommunities();
    res.status(201).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await communityService.getCommunityById(id);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommunityByName = async (req, res) => {
  try {
    const { name } = req.params;
    const community = await communityService.getCommunityByName(name);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommunity = async (req, res) => {
  try {
    const communityData = req.body;
    const community = await communityService.createCommunity(communityData);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const community = await communityService.updateCommunity(id, updatedData);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await communityService.deleteCommunity(id);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
