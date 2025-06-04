const commentService = require("../services/comment.service");

exports.createComment = async (req, res) => {
  try {
    const response = await commentService.createComment(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const response = await commentService.getCommentsByPostId(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const response = await commentService.updateComment(
      req.params.id,
      req.body
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const response = await commentService.deleteComment(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
