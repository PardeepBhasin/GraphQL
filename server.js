const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', cors(), expressGraphQL({
  schema: schema,
  graphiql:true
}))

app.listen(4000, () => {
  console.log("listening");
})
