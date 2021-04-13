const { rule, shield, and, or, not } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        return ctx.user !== null
    },
)

const isAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        return ctx.user.role === 'admin'
    },
)

// Permissions

const permissions = shield({
    Query: {
        // register: not(isAuthenticated),
        getAllPosts: and(isAuthenticated, isAdmin),
        // fruits: and(isAuthenticated, or(isAdmin, isEditor)),
        // customers: and(isAuthenticated, isAdmin),
    },
    Mutation: {
        register: not(isAuthenticated),
        login: isAuthenticated,
        createComment: isAuthenticated,
        //register: not(isAuthenticated),
    },
    //Fruit: isAuthenticated,
    //Customer: isAdmin,
})
module.exports = permissions