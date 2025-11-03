const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema({
  user: { type: ObjectId, ref: "User", index: true },
  targetType: { type: String, enum: ["post", "comment"] },
  targetId: { type: ObjectId, index: true },
  value: { type: Number, enum: [1, -1] },
  createdAt: { type: Date, default: Date.now },
});

VoteSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });
