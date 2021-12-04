const express = require("express")
const breadControl = require("./controllers/breads_control");
require("dotenv").config()
const PORT= process.env.PORT;
console.log(PORT)

const app= express()

app.get("/", (req, res) =>{
    res.send("Welcome to Bread")
})

app.use("/breads",breadControl);

app.listen(PORT, ()=>{
    console.log(`1\n***Listening on port:${PORT}***\n`)
});