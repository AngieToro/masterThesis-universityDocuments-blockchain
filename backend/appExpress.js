const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("./cors");
const transaccionRoutes = require("./routes/transaccionRoutes");

const app = express();

const uriDB = "mongodb://localhost/prototipo";
mongoose
  .connect(uriDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connect to database failed!" + error);
  });

//midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors);

app.use("/api/transaction", transaccionRoutes);

module.exports = app;
