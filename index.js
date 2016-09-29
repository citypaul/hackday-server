var express = require('express')
var app = express();
var port = process.env.PORT || 3001;
var glob = require('glob');
var fs = require('fs-extra');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.post('/:scenario/:id', function (req, res) {
    var filePath = 'data' + '/' + req.params.scenario + '/' + req.params.id + '.json';
    fs.outputJsonSync(filePath, req.body);
    res.send(req.body);
});

app.get('/:scenario', function(req, res) {
    glob('./data/' + req.params.scenario + '/*.json', {}, function (er, files) {
        res.json({
            snapshots: files.map(function (file) {
               return JSON.parse(fs.readFileSync(file, 'utf-8'));
            })
        });
    })
});

app.get('/:scenario/:id', function(req, res) {
    res.json(
        require('./data/' + req.params.scenario + '/' + req.params.id + '.json')
    );
});

console.log('port: ', port);
console.log('Server started!');
app.listen(port);