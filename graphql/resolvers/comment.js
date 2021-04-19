const createCommentResolvers = ({ sequelize: { models: { Post } } }) => {
  return {
    Mutation: {
      createComment: async (_, { content, postId }, { user = null }) => {
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
  }
};

module.exports = { createCommentResolvers }
