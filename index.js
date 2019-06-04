import {ApolloServer, gql} from 'apollo-server';

import Connection from './connection'
import UsersDAO from './dao/users.dao'

var connection = new Connection().getInstance();
let users;

const typeDefs = gql`
  # User Output Object.
  type User {
    id: ID!
    username: String!
    firstname:String!
    lastname: String!
    password: String!
    nic: String!
    deviceid: String!
    email: String!
    tp: String!
    location: Location!
    currentaddr: Address!
    verified: Boolean!
    blackListed: Boolean!
  }

  type Location {
    type: String!
    coordinates: [Float!]
  }

  type Address {
    district: String!
    dsdivision: String!
  }

  # User Input Object.

  input UserInput {
    username: String!
    firstname:String!
    lastname: String!
    password: String!
    nic: String!
    deviceid: String!
    email: String!
    tp: String!
    location: LocationInput!
    currentaddr: AddressInput!
    verified: Boolean!
    blackListed: Boolean!
  }

  input LocationInput {
    type: String!
    coordinates: [Float!]
  }

  input AddressInput {
    district: String!
    dsdivision: String!
  }

  type Response {
    acknowledged: String!
    insertedId: ID!
  }


 
  # User related queries
  type Query {
    users: [User],
    user(username: String!): User
  }

  # Adding Users/Updating and deleting

  type Mutation {
    adduser(user: UserInput!): Response!,
    updateuser(username: String!, firstname: String!, lastname: String!): User,
    deleteuser(username: String!): User
  }



`;

const resolvers = {
  Query: {
    users: async () =>  {
      return await UsersDAO.getAllUsers();
    },
    user: async (obj, args, context, info)=>{
      return await UsersDAO.getUserByUsername(args.username);
    },
  },
  Mutation:{
    adduser: async (obj, args, context, info) =>{
      return await UsersDAO.addNewUser(args);
    },
    updateuser: async(obj, args, context, info) => {
      return await UsersDAO.updateUser(args.username, args.firstname, args.lastname).then(data=>{        
        return data.value
      });
    },
    deleteuser: async(obj, args, context, info) => {
      return await UsersDAO.deleteUser(args.username).then(data=>{
        return data.value
        
      })
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then( ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

  connection.connect().then( async db => {
    await UsersDAO.injectDB(db);     
  })

});