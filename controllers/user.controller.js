const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAllConnections = async (req, res) => {
  try {
    const connections = await userService.getAllConnections(req.params.id);

    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;
    const user = await userService.joinCommunity(userId, communityId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;
    const user = await userService.leaveCommunity(userId, communityId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookmarkPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const user = await userService.bookmarkPost(userId, postId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unbookmarkPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const user = await userService.unbookmarkPost(userId, postId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookmarkedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await userService.getBookmarkedPosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCommunities = async (req, res) => {
  try {
    const userId = req.user.id;
    const communities = await userService.getUserCommunities(userId);
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await userService.searchUsers(q);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
