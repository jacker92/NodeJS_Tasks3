const express = require('express');
const morgan = require('morgan');
const validator = require('./query_validator.js');
const errorHandler = require("./error_handler.js");
const fetch = require("node-fetch");
const parser = require("./foodco_parser.js");

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/menus', (req, res, next) => {
    console.log("In app get menus");
    console.log("Sending request to validator");
    next();

}, (req, res) => {
    validator.validate(req, res);
    console.log(res.statusCode);
    if(res.statusCode == 200) {
        fetch("https://www.fazerfoodco.fi/modules/json/json/Index?costNumber=0083&language=fi")
        .then( response => {
            console.log(response.status, response.statusText);
            return response.json();   
        })
        .then(response => res.send(parser.parseData(response, req.query["action"])))
        .catch(err => console.log(err));
    }
});

app.use(errorHandler.errorHandler); 

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))
