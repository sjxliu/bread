// import app from index.js
const app = require("./index.js");


// Config
require("dotenv").config();
const PORT = process.env.PORT;


// LISTEN
app.listen(PORT, () => console.log(`\n***Running on port:${PORT}***\n`));