const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommunitySchema = new Schema(
  {
    communityName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    category: String,
    isNsfw: { type: Boolean, default: false },
    communityIcon: String,
    communityCoverImage: String,
    type: {
      type: String,
      enum: ["public", "private", "restricted"],
      default: "public",
    },
    createdBy: { type: ObjectId, ref: "User", required: true },
    moderators: [{ type: ObjectId, ref: "User" }],
    membersCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
    rules: [{ title: String, body: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

CommunitySchema.index({ name: 1 });
CommunitySchema.index({ lastActivityAt: -1 });

module.exports = mongoose.model("Community", CommunitySchema);
