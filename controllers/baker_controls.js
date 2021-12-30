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

// show 
baker.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
      .populate({
          path: 'breads',
          options: { limit: 2 }
      })
      .then(foundBaker => {
          res.render('bakerShow', {
              baker: foundBaker
          })
      })
})

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
    console.log("Deleted Baker:", deletedBaker);
    res.status(303).redirect("/breads");
  } catch (err) {
    console.log(err);
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

// baker.get("/data/seed", (req,res)=>{
//   Baker.insertMany(bakerSeedData)
//   .then(res.redirect("/breads"))
// })

module.exports = baker;
