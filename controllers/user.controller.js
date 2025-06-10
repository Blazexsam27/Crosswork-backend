const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
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
