const threadService = require("../services/thread.service");

exports.createThread = async (req, res) => {
  try {
    const response = await threadService.createThread(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    console.dir(req.params);
    const response = await threadService.getThreadById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllThreads = async (req, res) => {
  try {
    const response = await threadService.getAllThreads();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThreadsByCategory = async (req, res) => {
  try {
    const response = await threadService.getThreadsByCategory(
      req.body.category
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThreadByCategoryAndUser = async (req, res) => {
  try {
    const response = await threadService.getThreadsByCategoryAndUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateThread = async (req, res) => {
  try {
    const response = await threadService.updateThread(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const response = await threadService.deleteThread(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
