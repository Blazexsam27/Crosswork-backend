const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profilePic: { type: String },
    timezone: String,
    bio: { type: String },
    interests: [String],
    subjects: [String],
    availability: [String], // e.g. ["Mon 6-8pm", "Sat 10am"]
    languages: [String],
    university: [String],
    experience: [String],
    connections: [String],
    authProvider: {
      type: String, // "google", "github", "local"
      default: "local",
    },
    providerId: {
      type: String, // Google/GitHub user ID
    },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId }],
  },

  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);
