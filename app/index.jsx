// https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr

import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
//import './index.css';

class App extends React.Component {
    render () {
        return <p> Hello React!</p>;
    }
}

render(<App/>, document.getElementById('app'));



function Card(props) {
    return (<div className={props.card.wrapperClassName}>
        <div className="card" key={props.i}>
            <a className="display-topright padding close" onClick={props.closeOnClick} href="#">X</a>
            <p className="author"><b>{props.card.author}</b></p>
            <p className="media"><img src={props.card.media} alt=""/></p>
            <p className="description">{props.card.description}</p>
            <p className="date">{props.card.date}</p>
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
        this.url = 'https://queryfeed.net/twitter';
        this.state = {
            search: 'javascript',
            cards: thefeed
        };
    }


    handleCloseOnClick(i) {
        // remove element from list?
        console.log("its been clicked", i);

        const cards = this.state.cards.slice();
        cards[i].wrapperClassName='hide';
        this.setState({cards: cards});

        console.log("changed the cards array", cards);
    }

    loadDataFromServer() {
        return axios({
            method: 'get',
            url: this.url,
            data: {q: this.state.search},
        }).then(function(response){
            console.log(response);
            this.updateStateData(response);
            //this.setState({data: data});
        }).catch(function (response) {
            console.log(response);
        });
    }
    componentDidMount() {
        this.loadDataFromServer();
        //setInterval(this.loadDataFromServer, this.props.pollInterval);
    }
    handleDataSubmit(search) {
        const state = this.state.slice();
        state.search = search;
        this.setState(state);
        this.loadDataFromServer();
    }

    updateStateData(xml) {
        const state = this.state.slice();
        state.cards = this.transformXmlToCards(xml);
        this.setState(state);
    }

    transformXmlToCards(xml) {
        let json = [];
        return json;
    }

    listCards() {
        const listCards = this.state.cards.map((card, i) => {return (<Card card={card} key={"card-" + i} closeOnClick={() => this.handleCloseOnClick(i)} />)} );
        return (listCards);
    }

    render() {
        return (
            <div>
                <div>
                    <form className="query-form">
                        <input type="text" className="query" name="query" defaultValue={this.state.search} onSubmit={this.handleSubmit}/>
                    </form>
                </div>
                <div className="feed">
                    {this.listCards()}
                </div>
            </div>
        );
    }
}
