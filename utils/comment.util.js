function buildCommentTree(comments) {
  const commentMap = {};
  const roots = [];

  // init map
  comments.forEach((comment) => {
    comment.replies = [];
    commentMap[comment._id.toString()] = comment;
  });

  // build tree
  comments.forEach((comment) => {
    if (comment.parentComment) {
      const parent = commentMap[comment.parentComment.toString()];

      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

module.exports = { buildCommentTree };
