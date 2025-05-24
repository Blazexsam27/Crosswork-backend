const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timezone: String,
    subjects: [String],
    availability: [String], // e.g. ["Mon 6-8pm", "Sat 10am"]
    authProvider: {
      type: String, // "google", "github", "local"
      required: true,
    },
    providerId: {
      type: String, // Google/GitHub user ID
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
