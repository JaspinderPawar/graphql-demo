const { Post } = require('../../database/models');

module.exports = {
  Mutation: {
    createComment: (_, { content, postId }, { user = null }) => {
      const post = await Post.findByPk(postId);
      if (post) {
        return post.createComment({ content, userId: user.id });
      }
    },
  },

  Comment: {
    author(comment) {
      return comment.getAuthor();
    },
    post(comment) {
      return comment.getPost();
    },
  },
};
