module.exports = {
    registerMutate: `
            mutation register ($email: String!, $name: String!, $password: String!){
                register(input: { email: $email, password: $password, name: $name }) {
                  name
                  email
                }
              }
            `,
    loginMutate: `
        mutation login ($email: String!, $password: String! ){
            login(input: { email: $email, password: $password  }) {
                token
            }
          }
        `
}