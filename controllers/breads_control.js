const express = require("express")
const breads = express.Router()
const Bread = require("../models/bread")

breads.get("/", (req, res)=>{
    //res.send(breadType)
    res.render("Index",{
        breads: Bread,
       
    });
});

breads.get('/:arrayIndex', (req, res) => {
    //    res.send([req.params.arrayIndex])
    //the curly brace allow you to pass in data below bread = object
        res.render("Show", {
            bread: Bread[req.params.arrayIndex]
        })
    })
    
    module.exports = breads