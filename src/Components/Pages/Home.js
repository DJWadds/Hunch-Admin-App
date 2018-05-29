import React, { Component } from 'react';
import {eventList} from '../../external/eventsList';
import Event from '../Generic/Event';
import '../../css/Home.css';

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
            <button type="button" class="btn btn-danger">Add Event</button>
            <div id="events">
            {events.map((event, index) => <Event event={event} gotoEvent={gotoEvent} index={index}/>)}
            </div>
        </section>
    );
    }
}

export default Home;