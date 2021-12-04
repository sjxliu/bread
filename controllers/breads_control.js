const express = require("express")
const breads = express.Router()
const breadType = require("../models/bread")

breads.get("/", (req, res)=>{
    res.send(breadType)
});

breads.get("/:arrayIndex", (req, res)=>{
    res.send(breadType[req.params.arrayIndex]);
})

module.exports = breads;