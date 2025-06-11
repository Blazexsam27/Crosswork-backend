const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { generateJwt } = require("../utils/jwt.utils");
const router = express.Router();
require("dotenv").config();

router.post("/register", register);
router.post("/login", login);

// O Auth 2 authentication routes

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateJwt(req.user); // Returns JWT
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = generateJwt(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

// forgot pass
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
