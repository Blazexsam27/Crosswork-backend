const voteService = require("../services/vote.service");

exports.votePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { value } = req.body; // 1, -1, or 0
    const userId = req.user._id;

    const result = await voteService.votePost(userId, postId, value);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserVoteForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const vote = await voteService.getUserVoteForPost(userId, postId);
    res.status(200).json({ vote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserVotesForPosts = async (req, res) => {
  try {
    const { postIds } = req.body;
    const userId = req.user._id;

    const votes = await voteService.getUserVotesForPosts(userId, postIds);
    res.status(200).json({ votes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
