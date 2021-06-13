//MISEN WEB APPLICATION BACK-END SERVICES

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const utils = require("./utilities");
const { schema } = require("./typedefs");
const { root } = require("./resolvers");
const db_config = process.env.DB_SERVICE;
const serverPort = process.env.SERVER_PORT;
const serverUrl = process.env.SERVER_URL;
const db_options = utils.dbOptions;
const misen = express();

mongoose.Promise = global.Promise;
mongoose.connect(db_config, db_options).then(
  () => {
    console.log("MongoDB connection successful");
    server();
  },
  (error) => {
    console.log("MongoDB connection failed" + error);
  }
);

misen.use(cors());
misen.use(express.json());
misen.use(express.urlencoded({ extended: false }));

misen.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

misen.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

misen.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal server error",
    },
  });
});

const server = () => {
  misen.listen(serverPort, () => {
    console.log(`Misen server started on ${serverUrl}:${serverPort}`);
  });
};
