import React, { Component } from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import CreateUser from './createUser';
class UserDetails extends Component {
  deleteUser(id) {
    this.props.mutate({
      variables: {
        id
      },
      refetchQueries: [{query: gql`{
        users {
          title,
          id
        }
      }`}]
    })
  }
  renderUsers() {
    return this.props.data && this.props.data.users && this.props.data.users.map((user) => {
      return (
        <li key={user.title}>
          {user.title} <button onClick={() => this.deleteUser(user.id)}>Delete User</button>
        </li>
      )
    })
  }
  render() {
    return(
      <React.Fragment>
        Existing Users -
        <ul>{this.renderUsers()}</ul>
        <CreateUser/>
      </React.Fragment>
    )
  }
}

const query = gql`{
  users {
    title,
    id
  }
}`;

const mutation = gql`
  mutation DeleteUser($id: String) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default graphql(mutation) (
  graphql(query)(UserDetails)
)
