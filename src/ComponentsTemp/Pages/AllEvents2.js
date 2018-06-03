import React, { Component } from 'react';
import axios from 'axios';
import {addNewEventUrlTest} from '../../config/index';
import {eventList} from '../../external/eventsList';
import '../../css/Home.css';

import AddEvent from '../Home/AddEvent';
import CloseEvents from '../Home/CloseEvents';
import Event from '../Generic/Event';

class AllEvents extends Component {
    componentDidMount() {
        let events = eventList();
        const liveEvent = events.filter(event => event.live === true);
        events = events.filter(event => event.live === false && event.start === false);
        events.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        });
        this.setState({liveEvent: liveEvent[0], events});
    };
    state = {
        events: [],
        liveEvent: false
    };
    render() {
    if (!this.props.admin) return null;

    const {events, liveEvent} = this.state;
    const {gotoEvent, addEvent} = this;
    
    return ( 
        <section id="Home">
            <div id="homeHead">
                <h1> Events </h1>
                <AddEvent addEvent={addEvent}/>
            </div>
            <div id="currentEvents">
                {/* <h2> Current Events</h2> */}
                <div id="closeEvents">
                    <CloseEvents event={liveEvent} text="Live Event" gotoEvent={gotoEvent} live={true}/>
                    <CloseEvents event={events[0]} text="Next Event" gotoEvent={gotoEvent}/>
                    <CloseEvents event={events[1]} text="Coming Soon" gotoEvent={gotoEvent}/>
                </div>
            </div>
            <div id="upcommingEvents">
                <h2> Upcomming Events</h2>
                <div id="events">
                {events.map((event, index) => <Event event={event} gotoEvent={gotoEvent} index={index} key={event.id}/>)}
                </div>
            </div>

            
        </section>
    );
    }

    addEvent = (eventName, eventType, eventDate, eventImgUrl) => {
        let Oevent = {
            name: eventName,
            type: eventType,
            date: eventDate,
            img: eventImgUrl,
            description: '',
            live: false,
            start: false,
            complete: false
        }
        const event = JSON.stringify(Oevent)
        axios.post(addNewEventUrlTest, {event})
        .then((res) => {
            const eventID = res.data.eventID;
            const events = this.state.events;
            Oevent.id = eventID

            events.push(Oevent)
            this.setState({events})
            return null
        })
        .catch((err) => {
        })
    }
}

export default AllEvents;