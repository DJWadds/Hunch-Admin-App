import React, { Component } from 'react';
import {eventList} from '../../external/eventsList';
import Event from '../Generic/Event';
import '../../css/Home.css';
import axios from 'axios';
import {addNewEventUrl} from '../../config/index';
import AddEvent from '../Home/AddEvent';

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
    const {gotoEvent, addEvent} = this;
    return ( 
        <section id="Home">
            <h1> Events </h1>
            <AddEvent addEvent={addEvent}/>
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