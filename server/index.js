const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./src/routes")

require("dotenv").config();

// cors config
const cors = require("cors");
app.use(
  cors()
);

app.use(bodyparser.json());

// To connect to MongoDB
mongoose.connect(process.env.DB_HOST, {
  dbName: process.env.DB_NAME,
});

// To check connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

routes(app)


app.listen(process.env.PORT, () => {
  console.log(`This is listening on port: ${process.env.PORT}`);
});
