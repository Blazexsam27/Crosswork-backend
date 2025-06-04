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

const threadSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: String,
      },
    ],
    votes: [voteSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);
