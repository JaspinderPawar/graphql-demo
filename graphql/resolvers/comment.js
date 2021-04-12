const { Post } = require('../../database/models');
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, combine } = require('../permission/authenticated');

module.exports = {
  Mutation: {
    createComment: combineResolvers(isAuthenticated, (_, { content, postId }, { user = null }) => {
      return (async () => {
        const post = await Post.findByPk(postId);
        if (post) {
          return post.createComment({ content, userId: user.id });
        }
      })()
    }),
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
