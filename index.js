var express = require('express')
var app = express();
var port = process.env.PORT || 3001;
var glob = require('glob');
var fs = require('fs');

app.post('/scenario/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

});

app.get('/:scenario', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    glob('./mock-data/' + req.params.scenario + '/*.json', {}, function (er, files) {
        res.json({
            snapshots: files.map(function (file) {
               return JSON.parse(fs.readFileSync(file, 'utf-8'));
            })
        });
    })
});

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