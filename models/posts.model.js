const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    index: true,
  },
  postType: {
    type: String,
    enum: ["text", "link", "image", "video"],
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  title: { type: String, required: true, maxlength: 300 },
  body: String, // markdown
  linkUrl: String, // optional link posts
  media: [{ url: String, type: String }],
  isNsfw: { type: Boolean, default: false },
  isSpoiler: { type: Boolean, default: false },
  tags: [String],

  flair: String,
  isSticky: { type: Boolean, default: false },
  isRemoved: { type: Boolean, default: false },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  score: { type: Number, default: 0 }, // upvotes - downvotes, denormalized
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
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
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  updatedAt: Date,
  lastCommentedAt: Date,
});

PostSchema.index({ community: 1, createdAt: -1 });
PostSchema.index({ score: -1 });
PostSchema.index(
  { title: "text", body: "text" },
  { weights: { title: 5, body: 1 } }
);

module.exports = mongoose.model("Post", PostSchema);
