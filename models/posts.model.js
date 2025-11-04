const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  community: { type: ObjectId, ref: "Community", index: true },
  author: { type: ObjectId, ref: "User", index: true },
  title: { type: String, required: true, maxlength: 300 },
  body: String, // markdown
  url: String, // optional link posts
  media: [{ url: String, type: String }],

  flair: String,
  isSticky: { type: Boolean, default: false },
  isRemoved: { type: Boolean, default: false },
  removedBy: { type: ObjectId, ref: "User" },
  score: { type: Number, default: 0 }, // upvotes - downvotes, denormalized
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
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
