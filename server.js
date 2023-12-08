const express = require ('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// const { query } = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

let players = [];

app.get('/api/players', (req, res) => {
    res.send(players);
});

//player one
app.post('/api/players', (req, res) => {
    players.push({
        name: req.body.name,
        nameTwo: req.body.nameTwo
        // character: req.body.character
    });
    res.send(players);
});

app.put('/api/players', (req, res) => {
    // todos[Number(req.body.index)].name = req.body.name;
    // todos[Number(req.body.index)].date = req.body.date;
    // todos[Number(req.body.index)].category = req.body.category;
   
    res.send(players);
});

app.delete('/api/players', (req, res) => {
    res.send(players);
});

app.listen(port, () => {
    console.log(`this is ${port}`);
});