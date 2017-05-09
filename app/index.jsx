// https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr

import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
//import './index.css';

class Greeting extends React.Component {
    render () {
        return (<div>
            <div className="title"> Hello Visitor!</div>
            <div className="description">

                <p>This project includes the following:</p>
                <p>Nodejs - <a href="https://nodejs.org/en/">https://nodejs.org/en/</a> - Web and API Server </p>
                <p>Express - <a href="https://expressjs.com/">https://expressjs.com/</a> - Nodejs server framework for the backend requests to https://queryfeed.net/twitter.</p>
                <p>React - <a href="https://facebook.github.io/react/">https://facebook.github.io/react/</a> - for the view layer of the dynamic rss feed entries. </p>
                <p>Babel - <a href="https://babeljs.io/">https://babeljs.io/</a> - used to convert React JSX to ECMA5</p>
                <p>Webpack - <a href="https://webpack.js.org/">https://webpack.js.org/</a> Runs Babel and Bundles javascript toegther into one javascript file.</p>
                <p>axios - <a href="https://www.npmjs.com/package/axios">https://www.npmjs.com/package/axios</a> - used for server and client side ajax requests.</p>
                <p>xml2js - <a href="https://www.npmjs.com/package/xml2js">https://www.npmjs.com/package/xml2js</a> - used to convert RSS/XML feeds to json. </p>
            </div>
        </div>);
    }
}


function Card(props) {
    return (<div className={props.card.wrapperClassName}>
        <div className="card" key={props.i}>
            <a className="display-topright padding close" onClick={props.closeOnClick} href="#">X</a>
            <p className="title"><b>{props.card.title}</b></p>
            <p className="media"><img src={props.card.media} alt=""/></p>
            <p className="description">{props.card.description}</p>
            <p className="date"><b>{props.card.pubDate}</b></p>
        </div>
    </div>);
}

var thefeed = [
    {author: 'Brittney Bond @_KarimaTounsya', media: 'http://pbs.twimg.com/media/C65R5ulVAAAfngj.jpg', description: 'Angular Radial Color Picker <a href="http://ift.tt/2mUijWG">ift.tt/2mUijWG</a> https://t.co/HZvuixVwVB', date: 'Thu, 23 Mar 2017 at 2:09pm'},
    {author: 'Brittney Bond @_KarimaTounsya', media: 'http://pbs.twimg.com/media/C65R5ulVAAAfngj.jpg', description: 'Angular Radial Color Picker <a href="http://ift.tt/2mUijWG">ift.tt/2mUijWG</a> https://t.co/HZvuixVwVB', date: 'Thu, 23 Mar 2017 at 2:09pm'},
    {author: 'Brittney Bond @_KarimaTounsya', media: 'http://pbs.twimg.com/media/C65R5ulVAAAfngj.jpg', description: 'Angular Radial Color Picker <a href="http://ift.tt/2mUijWG">ift.tt/2mUijWG</a> https://t.co/HZvuixVwVB', date: 'Thu, 23 Mar 2017 at 2:09pm'}
];



class Feed extends React.Component {
    constructor() {
        super();
        //this.url = 'https://queryfeed.net/twitter';
        this.url = 'http://localhost:8080/feed';
        this.state = {
            search: 'javascript',
            cards: thefeed
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value});
        console.log("changed the state", e.target.value, this.state.search);
    }

    handleCloseOnClick(e, i) {
        // remove element from list?
        console.log("its been clicked", i);
        e.preventDefault();
        const cards = this.state.cards.slice();
        cards[i].wrapperClassName='hide';
        this.setState({cards: cards});

        console.log("changed the cards array", cards);
    }

    loadDataFromServer() {
        var self = this;
        return axios({
            method: 'get',
            url: this.url + '?q=' + encodeURIComponent(self.state.search),
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response){
            console.log("loadDataFromServer success", response);
            self.updateStateData(response.data);
            //this.setState({data: data});
        }).catch(function (response) {
            console.log("loadDataFromServer fail", response);
        });
    }
    componentDidMount() {
        this.loadDataFromServer();
        //setInterval(this.loadDataFromServer, this.props.pollInterval);
    }
    handleSubmit(e) {
        console.log("handleSubmit", e);
        e.preventDefault();
        this.loadDataFromServer();
    }

    updateStateData(data) {
        //let cards = this.state.cards.slice();
        let cards = this.getCardsFromJson(data);
        this.setState({cards: cards});
    }

    getCardsFromJson (json) {
        let items = json.rss.channel[0].item;
        //return items;
        let cards = items.map((item) => {
            let obj = {
                category: typeof item.category != 'undefined'?item.category:'',
                description: this._getfirstValue(item, 'description'),
                enclosure: this._getfirstValue(item, 'enclosure'),
                guid: this._getfirstValue(item, 'guid'),
                link: this._getfirstValue(item, 'link'),
                pubDate: this._getfirstValue(item, 'pubDate'),
                title: this._getfirstValue(item, 'title'),
            };

            if (typeof item.enclosure != 'undefined') {
                console.log("item.enclosure", item.enclosure, JSON.stringify(item.enclosure));
            }
            if (typeof item.enclosure != 'undefined' && typeof item.enclosure[0]['$'] != 'undefined') {
                console.log("item.enclosure[0]['$']", item.enclosure[0]['$']);
            }
            if (typeof item.enclosure != 'undefined'
                && typeof item.enclosure[0] != 'undefined'
                && typeof item.enclosure[0]['$'] != 'undefined'
                && typeof item.enclosure[0]['$'].url != 'undefined' ) {
                obj.media = item.enclosure[0]['$'].url;
            }
            return obj;
        });
        console.log("here are the cards", cards);
        return cards;
    }

    _getfirstValue (item, name) {
        if (typeof item[name] == undefined) return '';
        if (typeof item[name] == 'object') return item[name][0];
        return item[name];
    }

    listCards() {
        const listCards = this.state.cards.map((card, i) => {return (<Card card={card} key={"card-" + i} closeOnClick={(e) => this.handleCloseOnClick(e,i)} />)} );
        return (listCards);
    }

    render() {
        return (
            <div>
                <div>
                    <form name="search" className="query-form" onSubmit={this.handleSubmit}>
                        <input type="text" className="query" name="query" defaultValue={this.state.search} onChange={this.handleSearchChange}/>
                    </form>
                </div>
                <div className="feed">
                    {this.listCards()}
                </div>
            </div>
        );
    }
}



render(<Greeting/>, document.getElementById('greeting'));

render(<Feed/>, document.getElementById('feedCards'));
