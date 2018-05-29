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
        events: [],
        eventName: '',
        eventType: '',
        eventDate: '',
        eventImgUrl: ''
    };
    render() {
    const {events} = this.state;
    const {gotoEvent, updateEventName, updateEventType, updateEventDate, updateEventImgUrl, addEvent} = this;
    return ( 
        <section id="Home">
            <h1> Events </h1>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Add New Event</button>
            <div id="events">
            {events.map((event, index) => <Event event={event} gotoEvent={gotoEvent} index={index}/>)}
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label for="event-name" class="col-form-label">Event Name:</label>
                        <input type="text" class="form-control" id="event-name" onChange={updateEventName}/>
                    </div>
                    <div class="form-group">
                        <label for="event-type" class="col-form-label">Event type:</label>
                        <input type="text" class="form-control" id="event-type" onChange={updateEventType}/>
                    </div>
                    <div class="form-group">
                        <label for="event-date" class="col-form-label">Event date:</label>
                        <input type="text" class="form-control" id="event-date" onChange={updateEventDate}/>
                    </div>
                    <div class="form-group">
                        <label for="event-image-url" class="col-form-label">Event image-url:</label>
                        <input type="text" class="form-control" id="event-image-url" onChange={updateEventImgUrl}/>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={addEvent}>Add Event</button>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
    }

    updateEventName = (event) => {
        this.setState({eventName : event.target.value})
    }

    updateEventType = (event) => {
        this.setState({eventType : event.target.value})
    }

    updateEventDate = (event) => {
        this.setState({eventDate : event.target.value})
    }

    updateEventImgUrl = (event) => {
        this.setState({eventImgUrl : event.target.value})
    }

    addEvent = () => {
        console.log(this.state.eventName)
        console.log(this.state.eventType)
        console.log(this.state.eventDate)
        console.log(this.state.eventImgUrl)
    }
}

export default Home;