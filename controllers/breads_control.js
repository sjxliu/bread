const express = require("express");
const breads = express.Router();
const Baker = require("../models/baker");
const Bread = require("../models/bread");

//Index
breads.get("/", async (req, res) => {
  try {
    const foundBakers = await Baker.find().lean();
    const foundBreads = await Bread.find().limit(2).lean();
    res.render("index", {
      breads: foundBreads,
      bakers: foundBakers,
      title: "Index Page",
    });
  } catch (err) {
    next(err);
  }
});

//new
breads.get("/new", async (_req, res, next) => {
  try {
    const foundBakers = await Baker.find();
    res.render("new", {
      bakers: foundBakers,
    });
  } catch (err) {
    next(err);
  }
});

breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

//edit put on top of show
breads.get("/:id/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.id).then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers,
      });
    });
  });
});

// edit?

breads.get("/:id/edit", async (req, res, next) => {
  try {
    const foundBakers = await Baker.find();
    const foundBread = await Bread.findById(req.params.id);
    res.render("edit", {
      bread: foundBread,
      bakers: foundBakers,
    });
  } catch (err) {
    next(err);
  }
});

//NEW
// breads.get("/new", async(req,res)=>{
//     try{
//         const foundBakers = await Baker.find()
// res.render("new", {
//     bakers: foundBakers,
// });
//     } catch(err) {
//         res.send("ERROR");
//     }
// });

// show
breads.get("/:id", async (req, res, next) => {
  try {
    const foundBread = await Bread.findById(req.params.id).populate("baker");
    res.render("show", {
      bread: foundBread,
    });
  } catch (err) {
    next(err);
  }
});

//update
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).then((updatedBread) => {
    console.log(updatedBread);
    res.redirect(`/breads/${req.params.id}`);
  });
});

//DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id), res.status(303).redirect("/breads");
});

//Seed Route
breads.get("/data/seed", (req, res) => {
  Bread.insertMany(breadSeedData).then((createdBreads) => {
    res.redirect("/breads");
  });
});

module.exports = breads;
