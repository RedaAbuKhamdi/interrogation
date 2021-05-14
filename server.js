var express = require('express');

var app = express();
let session = require('/typescript_scripts/index.js')

const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '/static/')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});
app.get('/game', (req, res) => {
    res.sendFile(`${__dirname}/static/main_interface.html`);
});
app.get('/get_next_dialogue', (req, res) => {
    json_str = fs.readFileSync(req.query.next_file);
    res.send(json_str);
})
app.post('/add_keyword', (req, res) =>{
    session.addKeyword(JSON.parse(req.body).keyword);
});

app.listen(8080);

console.log('Server has started!');
