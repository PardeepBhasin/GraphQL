import React, { Component } from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }
  submitUserData = (event) => {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
      refetchQueries: [{query: gql`{
        users {
          title,
          id
        }
      }`}]
    })
  }
  render() {
    return(
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.submitUserData}>
          <label>User Title:</label>
          <input onChange={event => {this.setState({title: event.target.value})}} value={this.state.value} ></input>
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddUser($title: String!) {
    addUser(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(CreateUser);
