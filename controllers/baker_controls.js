const express = require("express");
const baker = express.Router();
const Baker = require("../models/baker");
const bakerSeedData = require("../models/baker_seed.js");



// show
baker.get("/:id", async (req, res, next) => {
  try {
    const foundBaker = await Baker.findById(req.params.id).populate("breads");
    res.render("bakerShow", {
      baker: foundBaker,
    });
  } catch (err) {
    next(err);
  }
});

//DELETE
// baker.delete("/:id/", (req, res) => {
//   Baker.findByIdAndDelete(req.params.id).then((deletedBaker) => {
//     console.log("Deleted Baker:", deletedBaker);
//     res.status(303).redirect("/breads");
//   });
// });

// Delete using async

baker.delete("/:id", async (req, res) => {
  try {
    // const deletedBaker =
    // don't need this if varible isn't being declared. In the delete code above the deleted baker needs to be in the params
    await Baker.findByIdAndDelete(req.params.id);
    res.status(303).redirect("/breads");
  } catch (err) {
    next(err);
  }
});

//Index
baker.get("/", async (_req, res, next) => {
  try {
    const foundBakers = await Baker.find().populate("breads");
    res.send(foundBakers);
  } catch (err) {
    next(err);
  }
});


baker.get("/data/seed", (_req, res) => {
  Baker.insertMany(bakerSeedData).then(res.redirect("/breads"))
 });

module.exports = baker;
