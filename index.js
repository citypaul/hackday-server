var express = require('express')
var app = express();
var port = process.env.PORT || 3001;

app.get('/:scenario/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(
        require('./mock-data/' + req.params.scenario + '/' + req.params.id + '.json')
    );
});

console.log('port: ', port);
console.log('Server started!');
app.listen(port);