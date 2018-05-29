import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {eventList} from '../../external/eventsList';
import Event from '../Generic/Event';

class Home extends Component {
    componentDidMount() {
        let events = eventList();
        events.sort(function(a, b) {
            // convert date object into number to resolve issue in typescript
            return  +new Date(a.date) - +new Date(b.date);
        })
        this.setState({events})
    }
    state ={
        events: []
    }
    render() {
    const {events} = this.state;
    const {gotoEvent} = this;
    return (
        <section id="Home">
            <h1> Events </h1>
            {events.map(event => <Event event={event} gotoEvent={gotoEvent} />)}
        </section>
    );
    }

    gotoEvent = (id) => {
        console.log(id)
    }
}

export default Home;