const express = require("express");
const Baker = require("../models/baker");
// const { flat } = require("../models/bread");
const breads = express.Router();
const Bread = require("../models/bread");
const breadSeedData = require("../models/baker_seed.js");

//Index
breads.get("/", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.find().then((foundBreads) => {
      res.render("index", {
        breads: foundBreads,
        bakers: foundBakers,
        title: "Index Page",
      });
    });
  });
});

//new
breads.get("/new", (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
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
// breads.get('/:arrayIndex/edit', (req, res)=> {
//     breadType.findById(req.params.arrayIndex).then(bread => {
//         res.render('Edit', {bread: bread,
//             index: req.params.arrayIndex})
//     })
//     .catch(err => {
//         res.status(404).render('Error')
//     })
// })

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
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
    .populate("baker")
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy();
      console.log(bakedBy);
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("error404");
    });
});

breads.get("/:id", (req, res) => {
  Baker.findById(req.params.id)
    .populate("breads")
    .then((foundBaker) => {
      res.render("bakerShow", {
        baker: foundBaker,
      });
    });
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
