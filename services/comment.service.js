const Comment = require("../models/comment.model");
const Thread = require("../models/thread.model");

exports.createComment = async (comment) => {
  try {
    // Determine depth based on parentComment (if any)
    let depth = 0;

    if (comment.parentComment) {
      const parent = await Comment.findById(comment.parentComment);
      if (!parent) throw new Error("Parent comment not found");
      depth = parent.depth + 1;
    }

    // Create the comment with the correct depth
    const result = await Comment.create({
      ...comment,
      depth,
    });

    // Add comment to the thread's top-level comments only if it's not a reply
    if (!comment.parentComment) {
      await Thread.findByIdAndUpdate(comment.post, {
        $push: { comments: result._id },
      });
    } else {
      // Otherwise, add it as a reply to the parent comment
      await Comment.findByIdAndUpdate(comment.parentComment, {
        $push: { replies: result._id },
      });
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Error creating comment");
  }
};

exports.getCommentsByThreadId = async (threadId) => {
  try {
    return await Thread.findById(threadId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommentById = async (commentId) => {
  try {
    return await Comment.findById(commentId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateComment = async (commentId, updatedData) => {
  try {
    return await Comment.findByIdAndUpdate(commentId, updatedData, {
      new: true,
    });
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
