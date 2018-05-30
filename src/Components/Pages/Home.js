import React, { Component } from 'react';
import axios from 'axios';
import {addNewEventUrl} from '../../config/index';
import {eventList} from '../../external/eventsList';
import '../../css/Home.css';

import AddEvent from '../Home/AddEvent';
import CloseEvents from '../Home/CloseEvents';
import Event from '../Generic/Event';

class Home extends Component {
    componentDidMount() {
        let events = eventList();
        const startedEvent = events.filter(event => event.start === true);
        const liveEvent = events.filter(event => event.live === true);
        events = events.filter(event => event.live === false && event.start === false);
        events.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        });
        this.setState({startedEvent: startedEvent[0], liveEvent: liveEvent[0], events});
    };
    state = {
        events: [],
        startedEvent: false, 
        liveEvent: false
    };
    render() {
    const {events, liveEvent, startedEvent} = this.state;
    const {gotoEvent, addEvent} = this;
    return ( 
        <section id="Home">
            <h1> Events </h1>
            <AddEvent addEvent={addEvent}/>
            <div id="closeEvents">
            <CloseEvents event={startedEvent} text="Started Event"/>
            <CloseEvents event={liveEvent} text="Live Event"/>
            <CloseEvents event={events[0]} text="Next Event"/>
            </div>
            <div id="events">
            {events.map((event, index) => <Event event={event} gotoEvent={gotoEvent} index={index} key={event.id}/>)}
            </div>

            
        </section>
    );
    }

    addEvent = (eventName, eventType, eventDate, eventImgUrl, questions) => {
        let Oevent = {
            name: eventName,
            type: eventType,
            date: eventDate,
            img: eventImgUrl,
            description: '',
            questions,
            live: false,
            start: false,
            complete: false
        }
        const event = JSON.stringify(Oevent)
        axios.post(addNewEventUrl, {event})
        .then((res) => {
            const eventID = res.data.eventID;
            const events = this.state.events;
            console.log(eventID)
            Oevent.id = eventID
            console.log(Oevent)
            events.push(Oevent)
            this.setState({events})
            return console.log(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default Home;