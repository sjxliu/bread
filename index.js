// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//CONFIGURATION
require("dotenv").config();
const DB_URI = process.env.MONGO_URI;
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(methodOverride("_method"));

// DB CONNECTION
mongoose.connect(
  DB_URI, () => console.log(`\n***Connected to Mongo: ${DB_URI}***\n`)
);

//ROUTES (Base)
app.get("/", (_req, res) => {
  res.send("Welcome Bread!");
});

//breads
const breadsController = require("./controllers/breads_control.js");
app.use("/breads", breadsController);

// Bakers
const bakerControl = require("./controllers/baker_controls");
app.use("/bakers", bakerControl);

// error
app.get("*", (_req, res) => {
  res.send("404");
});

// Error Handler
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)


//export app
module.exports = app;