import {ApolloServer, gql} from 'apollo-server';

import Connection from './connection'
import UsersDAO from './dao/users.dao'

var connection = new Connection().getInstance();
let users;

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    username: String!
    nic: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    users: [User],
    user(username: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () =>  {
      return await UsersDAO.getAllUsers();
    },
    user: async (username)=>{
      console.log(username);
      
      return await UsersDAO.getUserByUsername(username);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then( ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

  connection.connect().then( async db => {
    await UsersDAO.injectDB(db);     
  })

});