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
