const index_controller = require("../controllers/index_controller");
const scripts_controller = require("../controllers/scripts_controller");
const styles_controller = require("../controllers/styles_controller");
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const port_number = 8080;
const app = express();


app.set('view engine', "ejs");
app.set('views','src/views');
app.get("/", index_controller)
app.get('/scripts/*', scripts_controller);
app.get('/styles/*', styles_controller);



app.listen(port_number, () => {
    console.log("Server listening on 8080");
})
