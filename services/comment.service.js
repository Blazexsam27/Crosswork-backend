const Comment = require("../models/comment.model");

exports.createComment = async (comment) => {
  try {
    return await Comment.create(comment);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommentsByPostId = async (commentId) => {
  try {
    return await Comment.findById(commentId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateComment = async (commentId, comment) => {
  try {
    return await Comment.findByIdAndUpdate(commentId, comment, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteComment = async (commentId) => {
  try {
    return await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    throw new Error(error);
  }
};
