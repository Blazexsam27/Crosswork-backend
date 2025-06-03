const recommendationService = require("../services/recommendation.service");

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await recommendationService.getRecommendations(
      req.body
    );
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
