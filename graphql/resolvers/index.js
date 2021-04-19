const { createUserResolvers } = require('./user');
const { createPostResolvers } = require('./post');
const { createCommentResolvers } = require('./comment');

const createResolvers = ({ sequelize }) => {

    const userResolvers = createUserResolvers({ sequelize });
    const postResolvers = createPostResolvers({ sequelize })
    const commentResolvers = createCommentResolvers({ sequelize })

    return [userResolvers, postResolvers, commentResolvers]
}
module.exports = { createResolvers };
