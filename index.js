const express = require('express');
const morgan = require('morgan');
const validator = require('./query_validator.js');

const app = express(); 
const port = 3000;

app.use(morgan('dev'));

app.get('/menus', (req, res, next) => {
    console.log("In app get menus");
    console.log("Sending request to validator");
    next();
}, (req,res) => {
    validator.validate(req,res);
});


app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))
