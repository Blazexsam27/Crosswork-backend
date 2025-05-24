const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/auth.controller");
const { generateJwt } = require("../utils/jwt.utils");
const router = express.Router();

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
    const token = generateToken(req.user); // Returns JWT
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
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
    const token = generateToken(req.user);
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

module.exports = router;
