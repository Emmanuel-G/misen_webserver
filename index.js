//MISEN WEB APPLICATION
//BACK-END SERVICES
const express = require("express");
const mongoose = require("mongoose");

const dbConfig = require("./database/dbase");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.dbase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("MongoDB database connected");
    },
    (error) => {
      console.log("Error connecting to MongoDB database" + error);
    }
  );

const misen = express();

misen.listen(5500, () => {
  console.log(`Misen webserver on http://127.0.0.1:5500`);
});
