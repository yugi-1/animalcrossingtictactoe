const express = require ('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// const { query } = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));



app.listen(port, () => {
    console.log(`this is ${port}`);
});