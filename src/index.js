import React from 'react';
import ReactDOM from 'react-dom';

//On load, called to load the auth2 library and API client library.
import {default as ApolloClient} from "apollo-boost";
import {ApolloProvider} from 'react-apollo';
import './index.css';
import {default as App} from './App';
import * as serviceWorker from './serviceWorker';

//Reason for passing the object inside ApolloClient to run api in same port of GraphQL.
//Other wise request will go through port where front end application is running.
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
