const authMiddleware = require("../middlewares/auth.middleware");
const {
  getPendingInvitesOfUser,
} = require("../controllers/notification.controller");

const express = require("express");
const router = express.Router();

router.get("/get-pending-request", authMiddleware, getPendingInvitesOfUser);

module.exports = router;
