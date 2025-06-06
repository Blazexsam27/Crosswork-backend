const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  voteType: {
    type: String,
    required: true,
  },
});

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Thread",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    depth: {
      type: Number,
      default: 0,
    },
    votes: [voteSchema],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ post: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ depth: 1 });

module.exports = mongoose.model("Comment", commentSchema);
