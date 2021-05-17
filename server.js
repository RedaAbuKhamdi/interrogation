var express = require('express');
var bodyParser = require('body-parser')

var app = express();
let session = require('./typescript_scripts/index.js').session;

app.use(bodyParser.urlencoded({ extended: true }))

  

const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '/static/')));

app.get('/', (req, res) => {
    session.setNumberOfInterviewees(5);
    res.sendFile(`${__dirname}/static/index.html`);
});
app.get('/game', (req, res) => {
    res.sendFile(`${__dirname}/static/main_interface.html`);
});
app.get('/get_next_dialogue', (req, res) => {
    json_str = fs.readFileSync(req.query.next_file, 'utf8');
    res.send(json_str);
})
app.get('/get_num_of_interviewees', (req, res) =>{
    console.log(session);
    res.send(''+session.num_of_interviewees)
})
app.post('/add_keyword', (req, res) =>{
    session.session.addKeyword(req.body.keyword);
});

app.listen(8080);

console.log('Server has started!');
