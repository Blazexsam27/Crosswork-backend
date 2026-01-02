const Vote = require("../models/vote.model");
const Post = require("../models/posts.model");
const Comment = require("../models/comment.model");

exports.votePost = async (userId, postId, value) => {
  try {
    // value is 1 for upvote, -1 for downvote, 0 for remove vote
    const existingVote = await Vote.findOne({
      user: userId,
      targetType: "post",
      targetId: postId,
    });

    let voteChange = 0;

    if (value === 0) {
      // Remove vote
      if (existingVote) {
        voteChange = -existingVote.value;
        await Vote.deleteOne({ _id: existingVote._id });
      }
    } else if (existingVote) {
      // Update existing vote
      if (existingVote.value !== value) {
        voteChange = value - existingVote.value;
        existingVote.value = value;
        await existingVote.save();
      }
    } else {
      // Create new vote
      await Vote.create({
        user: userId,
        targetType: "post",
        targetId: postId,
        value,
      });
      voteChange = value;
    }

    // Update post vote counts
    if (voteChange !== 0) {
      const updateObj = {};
      if (voteChange > 0) {
        updateObj.$inc = { upvotes: voteChange, score: voteChange };
        if (voteChange === 2) {
          // Changed from downvote to upvote
          updateObj.$inc.downvotes = -1;
        }
      } else {
        updateObj.$inc = { downvotes: Math.abs(voteChange), score: voteChange };
        if (voteChange === -2) {
          // Changed from upvote to downvote
          updateObj.$inc.upvotes = -1;
        }
      }

      await Post.findByIdAndUpdate(postId, updateObj);
    }

    // Get updated post
    const post = await Post.findById(postId)
      .populate("author", "name profilePic")
      .populate("community", "name communityIcon");

    // Get user's current vote
    const currentVote = await Vote.findOne({
      user: userId,
      targetType: "post",
      targetId: postId,
    });

    return {
      post,
      userVote: currentVote ? currentVote.value : 0,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserVoteForPost = async (userId, postId) => {
  try {
    const vote = await Vote.findOne({
      user: userId,
      targetType: "post",
      targetId: postId,
    });
    return vote ? vote.value : 0;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserVotesForPosts = async (userId, postIds) => {
  try {
    const votes = await Vote.find({
      user: userId,
      targetType: "post",
      targetId: { $in: postIds },
    });

    const voteMap = {};
    votes.forEach((vote) => {
      voteMap[vote.targetId.toString()] = vote.value;
    });

    return voteMap;
  } catch (error) {
    throw new Error(error);
  }
};
