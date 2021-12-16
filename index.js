// DEPENDENCIES
const express = require('express')
const methOverride = require("method-override")
const mongoose = require("mongoose")


//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methOverride("_method"))


// DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () =>console.log("3333 connected to Database")
    )


//ROUTES
app.get('/', (req, res) => {
    res.send("Welcome Bread!")
})

//breads
const breadsController = require('./controllers/breads_control.js')
app.use('/breads', breadsController)

app.get("*", (req,res)=>{
    res.send("404");
})
//LISTEN
app.listen(PORT, () => {
    console.log(PORT, 'has risen');
})