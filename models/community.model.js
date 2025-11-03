const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunitySchema = new Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  title: String,
  description: String,
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
  lastActivityAt: { type: Date, default: Date.now },
  rules: [{ title: String, body: String }],
  flairs: [{ id: String, text: String }],
  createdAt: { type: Date, default: Date.now },
});

CommunitySchema.index({ name: 1 });
CommunitySchema.index({ lastActivityAt: -1 });
