import React, { Component } from 'react';
import {eventList} from '../../external/eventsList';
import Event from '../Generic/Event';

class Home extends Component {
    componentDidMount() {
        let events = eventList();
        events.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        });
        this.setState({events});
    };
    state = {
        events: []
    };
    render() {
    const {events} = this.state;
    const {gotoEvent} = this;
    return ( 
        <section id="Home">
            <h1> Events </h1>
            {events.map((event, index) => <Event event={event} gotoEvent={gotoEvent} index={index}/>)}
        </section>
    );
    }
}

export default Home;