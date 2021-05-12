var express = require('express');

var app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/static/')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});
app.get('/game', (req, res) => {
    res.sendFile(`${__dirname}/static/main_interface.html`);
});

app.listen(8080);

console.log('Server has started!');
