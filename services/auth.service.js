const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mail.util");
const crypto = require("crypto");
require("dotenv").config();

exports.registerUser = async ({ name, email, password, authProvider }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
    authProvider,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10000d",
  });
  return { token };
};

exports.resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error({ message: "Token is invalid or expired" });
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return "Password reset successfully";
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 min
  await user.save();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Reset your password using this link: ${resetURL}`,
  });
  return "Password reset email sent";
};
