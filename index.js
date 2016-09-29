var express = require('express')
var app = express();
var port = process.env.PORT || 3001;
var glob = require('glob');
var fs = require('fs-extra');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/:scenario/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var filePath = 'data' + '/' + req.params.scenario + '/' + req.params.id + '.json';
    fs.outputJsonSync(filePath, req.body);
    res.send(req.body);
});

app.get('/:scenario', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    glob('./data/' + req.params.scenario + '/*.json', {}, function (er, files) {
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
        require('./data/' + req.params.scenario + '/' + req.params.id + '.json')
    );
});

console.log('port: ', port);
console.log('Server started!');
app.listen(port);