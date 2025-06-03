const express = require("express");
const router = express.Router();

const recommendationController = require("../controllers/recommendation.controller");

const auth = require("../middlewares/auth.middleware");

router.post("/", auth, recommendationController.getRecommendations);

module.exports = router;
