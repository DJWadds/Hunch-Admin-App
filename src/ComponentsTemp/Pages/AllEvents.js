import React, { Component } from 'react';
import axios from 'axios';
import {getAllEvents, postNewEvent, makeCurrentEventLive} from '../../config/index';
import '../../css/AllEvents.css';

import AddEvent from '../Home/AddEvent';
import Event from '../Generic/Event';

class AllEvents extends Component {
    componentDidMount () {
        this.getAllEvents();
    };
    state = {
        events: [],
        currentEventId: '',
        currentEvent: {},
        liveEvent: false
    };
    render() {
    const {events, currentEvent, liveEvent} = this.state;
    const {addEvent, makeEventLive} = this;
    const {admin} = this.props
        console.log(events)
    if (!admin) return null;
    return (<section id="all-events">
        <AddEvent addEvent={addEvent}/>
        {currentEvent ? 
        <div id="all-events-live"> 
            <Event event={currentEvent} currentEvent={currentEvent} liveEvent={liveEvent}/>
        </div>
        : null}
        <div id="all-events-all">
            {events.map((event, index) => <Event event={event} index={index} currentEvent={currentEvent} key={event.index} makeEventLive={makeEventLive}/>)}
        </div>
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
        const events = Object.values(data);
        events.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        });
        this.setState({events})
    }

    makeEventLive = (event, index) => {
        let currentEvent = {...event}
        currentEvent.questions = 6
        currentEvent.date = Date.parse(currentEvent.date)

        for (let i = 1; i <= 6; i++) {
            currentEvent[i] = {
                id: i,
                question: `Input question here`,
                choiceA: 'Input choice A here',
                choiceB: 'Input choice B here',
                choiceC: 'Input choice C here',
                usersA: [],
                usersB: [],
                usersC: [],
                timeToSet: new Date('June 01, 2018 00:00:01'),
                closed: false
                }
        }
        axios.post(makeCurrentEventLive, {currentEvent})
        .then((res) => {
            console.log(res)
            const currentEventId = res.data.eventID
            console.log(currentEventId)
            console.log(currentEvent)
            this.setState({currentEventId, currentEvent})
            return console.log(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }

}

export default AllEvents;