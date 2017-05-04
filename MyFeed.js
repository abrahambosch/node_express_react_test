
var exports = module.exports = {};
var parseString = require('xml2js').parseString;
var axios = require('axios');

function MyFeed() {}

var MyFeed = {
    constructor: MyFeed,
    json: {},
    url: 'https://queryfeed.net/twitter',

    getCards: function(search, callback, failCallback) {
        var self = this;
        self.loadDataFromServer(search, 'json', function(json){
            callback({cards: self.getCardsFromJson(json)});
        }, function(error){
            failCallback(error);
        });
    },

    loadDataFromServer: function (search, format, callback, failCallback) {
        var self = this;
        return axios({
            method: 'get',
            url: self.url + "?q=" + encodeURIComponent(search)
        }).then(function(response){
            console.log(response);
            if (format == 'json') {
                self.parseXml(response.data, function (json){
                    callback(json);
                });
            }
            else {
                callback(response.data);
            }
            //this.setState({data: data});
        }).catch(function (response) {
            console.log(response);
            failCallback(response);
        });
    },

    parseXml: function (xml, callback) {
        var self = this;
        parseString(xml, function (err, result) {
            console.dir(result);
            callback(result);
        });
    },

    getCardsFromJson: function (json) {
        var self = this,
            jsonObj = json,
            items = jsonObj.rss.channel[0].item;
        //return items;
        var cards = items.map(function (item){ return {
            category: item.category,
            description: self._getfirstValue(item, 'description'),
            enclosure: self._getfirstValue(item, 'enclosure'),
            guid: self._getfirstValue(item, 'guid'),
            pubDate: self._getfirstValue(item, 'pubDate'),
            title: self._getfirstValue(item, 'title'),
        }; });
        return cards;
    },

    _getfirstValue: function(item, name) {
        if (typeof item[name] == undefined) return item[name];
        if (typeof item[name] == 'object') return item[name][0];
        return item[name];

    }

};

module.exports = MyFeed;