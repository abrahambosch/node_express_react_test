var express = require('express')
var app = express()
var port = process.env.PORT || 8080;
app.set('port', port);

var MyFeed = require('./MyFeed.js');

app.use(express.static('public'))

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.get('/', function (req, res) {
    res.send('Hello Roadtrip Nation!');
})

app.get('/feed', function (req, res) {
    var acceptsJSON = req.accepts('json'),
        format = acceptsJSON == 'json'?'json':'xml';

    MyFeed.loadDataFromServer('javascript', format, function(output){
        if (format == 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(output));
        }
        else {
            res.setHeader('Content-Type', 'application/rss+xml');
            res.send(output);
        }
        //res.send(JSON.stringify(json));

    }, function(error){
        res.send('Got an Error' + error);
    })

})

app.get('/cards', function (req, res) {
    MyFeed.getCards('javascript', function(cards){
        res.setHeader('Content-Type', 'application/json');
        //res.send(JSON.stringify(json));
        res.send(JSON.stringify(cards));
    }, function(error){
        res.send('Got an Error' + error);
    })

})


app.listen(port, function () {
    console.log('Roadtrip Example app listening on port: '+ port)
})