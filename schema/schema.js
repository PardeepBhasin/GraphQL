const graphql =  require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id : {type : GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        .then(resp => resp.data)
      }
    }
  })
})

const UserType  = new GraphQLObjectType({
  name: 'User',
  fields : () => ({
    id : {type: GraphQLString},
    userId: {type: GraphQLString},
    title: {type: GraphQLString},
    completed: {type: GraphQLString},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}`)
        .then(resp => resp.data)
      }
    }
  })
});

const RootQuery =  new GraphQLObjectType({
  name: 'RootQueryType',
  fields : {
    user : {
      type: UserType,
      args: {id : {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
        .then(resp => resp.data)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return (axios.get(`http://localhost:3000/users`)
        .then(resp => resp.data))
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return(axios.get(`http://localhost:3000/companies/${args.id}`))
        .then(resp => resp.data)
      }
    },
  }})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id : {type: GraphQLString},
        userId: {type: GraphQLString},
        title: {type: new GraphQLNonNull(GraphQLString)},
        completed: {type: GraphQLString},
      },
      resolve(parentValue, { title}) {
        return(axios.post('http://localhost:3000/users', { title }))
        .then(resp => resp.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, {id}) {
        return axios.delete(`http://localhost:3000/users/${id}`)
        .then(resp => resp.data)
      }
    },
  }
})


module.exports =  new GraphQLSchema({
  query : RootQuery,
  mutation
});
