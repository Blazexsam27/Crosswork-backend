const Thread = require("../models/thread.model");
const Comment = require("../models/comment.model");
const { buildCommentTree } = require("../utils/comment.util");
exports.createThread = async (thread) => {
  try {
    return await Thread.create(thread);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getThreadById = async (threadId) => {
  try {
    const thread = await Thread.findById(threadId).lean();
    const comments = await Comment.find({ post: threadId })
      .populate("author", "name email")
      .populate("likes", "name")
      .lean();

    const threadedComments = buildCommentTree(comments);

    return {
      ...thread,
      comments: threadedComments,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllThreads = async () => {
  try {
    return await Thread.find({})
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .populate("comments");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllCategories = async () => {
  try {
    return await Thread.distinct("category");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getThreadsByCategory = async (category) => {
  try {
    return await Thread.find({ category }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getThreadsByUser = async (userId) => {
  try {
    return await Thread.find({ user: userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getThreadsByCategoryAndUser = async (category, userId) => {
  try {
    return await Thread.find({ category, user: userId }).sort({
      createdAt: -1,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateThread = async (threadId, thread) => {
  try {
    return await Thread.findByIdAndUpdate(threadId, thread, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteThread = async (threadId) => {
  try {
    return await Thread.findByIdAndDelete(threadId);
  } catch (error) {
    throw new Error(error);
  }
};
