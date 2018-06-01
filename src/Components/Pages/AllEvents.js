import React, { Component } from 'react';
import axios from 'axios';
import {getAllEvents, postNewEvent} from '../../config/index';

import AddEvent from '../Home/AddEvent';

class AllEvents extends Component {
    componentDidMount () {
        this.getAllEvents();
    };
    state = {
        events: [],
        currentEventId: ''
    };
    render() {
    const {events, currentEventId} = this.state;
    const {addEvent} = this;
    const {} = this.props
    return (<section id="all-events">
        <AddEvent addEvent={addEvent}/>
        {events.map((event, i) => {
            return <div> {event.name} </div>
        })}
    </section>);
    }

    getAllEvents = () => {
        axios.get(getAllEvents)
        .then((res) => {
            const data = res.data;
            this.reduceToEventArray(data);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    addEvent = (eventName, eventType, eventDate, eventImgUrl, description) => {
        console.log(eventType)
        const event = {
            name: eventName,
            type: eventType,
            date: eventDate,
            img: eventImgUrl,
            description: description,
            live: false,
            start: false,
            complete: false
        }
        const addEvent = {eventName: eventName, event}
        axios.post(postNewEvent, addEvent)
        .then((res) => {
            const data = res.data;
            this.reduceToEventArray(data);
            return console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    reduceToEventArray = (data) => {
        console.log(data);
        const events = Object.values(data);
        events.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        });
        console.log(events)
    }

}

export default AllEvents;