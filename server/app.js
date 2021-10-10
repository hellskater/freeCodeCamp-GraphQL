const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

// App Config
const app = express();

app.use(cors());

// DB config
mongoose.connect(
  "mongodb+srv://admin:PZfJb33a8PYSxVqL@cluster0.paucw.mongodb.net/graphqldb?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middlewares
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Listener
app.listen(4000, () => {
  console.log("Started listening on port 4000");
});
