const express = require("express");
const baker = express.Router();
const Baker = require("../models/baker");
const bakerSeedData = require("../models/baker_seed.js");

baker.get("/data/seed", async (req, res) => {
  try {
    await Baker.insertMany(bakerSeedData);
    res.redirect("/breads");
  } catch (err) {
    res.send("ERROR");
  }
});

//Index
baker.get("/", (req, res) => {
  Baker.find()
    .populate("breads")
    .then((foundBakers) => {
      res.send(foundBakers);
    });
});

module.exports = baker;
