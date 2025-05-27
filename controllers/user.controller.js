const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.user.id);
  res.status(200).json(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

exports.updateUser = async (req, res) => {
  const updated = await userService.updateUser(req.body);
  res.status(200).json(updated);
};

exports.sendConnectionRequest = async (req, res) => {
  try {
    const result = await userService.sendConnectionRequest(
      req.query.senderId,
      req.query.targetId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptConnectionRequest = async (req, res) => {
  try {
    const result = await userService.acceptConnectionRequest(
      req.query.senderId,
      req.query.targetId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
