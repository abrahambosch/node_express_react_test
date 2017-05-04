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
    var format = req.accepts('json') == 'json'?'json':'xml';
    if (typeof req.query.q == 'undefined') {
        return res.status(400).send('query paramerer "q" is missing. ');
    }
    MyFeed.getFeed(req.query.q, function(output){
        res.format({
            'application/json': function(){
                MyFeed.parseXml(output, function (json){
                    res.json(json);
                });
            },
            'default': function() {     // default to xml
                // log the request and respond with 406
                //res.status(406).send('Not Acceptable');
                res.setHeader('Content-Type', 'application/rss+xml');
                res.send(output);
            }
        })

    }, function(error){
        res.status(400).send('Got an Error' + error);
    })

})

app.get('/cards', function (req, res) {
    if (typeof req.query.q == 'undefined') {
        return res.status(400).send('query paramerer "q" is missing. ');
    }
    MyFeed.getCards(req.query.q, function(cards){
        //res.setHeader('Content-Type', 'application/json');
        //res.send(JSON.stringify(json));
        res.json(JSON.stringify(cards));
    }, function(error){
        res.status(400).send('Got an Error' + error);
    })

})


app.listen(port, function () {
    console.log('Roadtrip Example app listening on port: '+ port)
})