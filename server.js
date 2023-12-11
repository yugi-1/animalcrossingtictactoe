const express = require ('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

let players = [];

app.get('/api/players', (req, res) => {
    res.send(players);
});

app.post('/api/players', (req, res) => {
    players.push({
        name: req.body.name,
        nameTwo: req.body.nameTwo,
        characterOne: req.body.characterOne,
        characterTwo: req.body.characterTwo
    });
    res.send(players);
});

app.put('/api/players', (req, res) => {
        players[0].name = req.body.name;
        players[1].nameTwo = req.body.nameTwo;
        res.send(players);
});

app.delete('/api/players', (req, res) => {
    players.shift();
    res.send(players);
});

app.listen(port, () => {
    console.log(`this is ${port}`);
});