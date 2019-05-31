import {ApolloServer, gql} from 'apollo-server';

import Connection from './connection'

/*const users = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];
*/

//let users = [];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    username: String
    nic: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: (users) => {
      console.log(users);
      
      users
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then( ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

   Connection.connect().then(db=>{
    db.collection('users').find({}).toArray((err, items)=> {
      //console.log(items);
      users = items;
      
    });
    
  })

});