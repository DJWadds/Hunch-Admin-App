import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Event.css';

function Event ({event, gotoEvent}) {
    return <div key={event.id} className="event">
        <h3> {event.name} </h3>
        <img src="https://placeimg.com/640/480/any" alt="event" />
        <div> Type: {event.type} </div>
        <div> Date: {event.date} </div>
        <div><NavLink to={`/event/${event.id}`}><button type="button" class="btn btn-primary">Got To Event</button></NavLink></div>
    </div>
}

export default Event;