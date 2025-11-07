const auth = require("../middlewares/auth.middleware");
const {
  getAllCommunities,
  createCommunity,
  getCommunityByName,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/community.controller");

const express = require("express");
const router = express.Router();

router.get("/", auth, getAllCommunities);
router.post("/", auth, createCommunity);
router.get("/name/:name", auth, getCommunityByName);
router.get("/:id", auth, getCommunityById);
router.put("/:id", auth, updateCommunity);
router.delete("/:id", auth, deleteCommunity);

module.exports = router;
