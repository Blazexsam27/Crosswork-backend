const Post = require("../models/posts.model");
const Comment = require("../models/comment.model");
const Community = require("../models/community.model");

exports.createPost = async (post) => {
  try {
    const createdPost = await Post.create(post);
    // update community post array and count

    await Community.findByIdAndUpdate(post.community, {
      $inc: { postCount: 1 },
      $push: { posts: createdPost._id },
    });
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPostById = async (postId) => {
  try {
    return await Post.findById(postId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllPosts = async () => {
  try {
    return await Post.find({})
      .populate("author", "name")
      .populate("community", "name communityIcon")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPostsByCommunity = async (communityId) => {
  try {
    return await Post.find({ community: communityId })
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .populate("community", "name communityIcon");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPostsByUser = async (userId) => {
  try {
    return await Post.find({ author: userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePost = async (postId, updateData) => {
  try {
    return await Post.findByIdAndUpdate(postId, updateData, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deletePost = async (postId) => {
  try {
    return await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.searchPosts = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    // Check if query starts with # for hashtag search
    const isHashtagSearch = query.startsWith("#");
    const searchTerm = isHashtagSearch
      ? query.substring(1).trim()
      : query.trim();

    if (!searchTerm) {
      return [];
    }

    const searchRegex = new RegExp(searchTerm, "i");

    let searchCriteria;
    if (isHashtagSearch) {
      // Search only in tags for hashtag queries
      searchCriteria = {
        tags: searchRegex,
        isRemoved: false,
      };
    } else {
      // Search in title, body, and tags for regular queries
      searchCriteria = {
        $or: [
          { title: searchRegex },
          { body: searchRegex },
          { tags: searchRegex },
        ],
        isRemoved: false,
      };
    }

    return await Post.find(searchCriteria)
      .populate("author", "name profilePic")
      .populate("community", "communityName communityIcon")
      .select(
        "title body postType tags score commentCount createdAt community author"
      )
      .sort({ score: -1, createdAt: -1 })
      .limit(15);
  } catch (error) {
    throw new Error(error);
  }
};
