import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Event.css';

function Event ({event, gotoEvent}) {
    return <div key={event.id} className="event">
        <h3> {event.name} </h3>
        <div> Type: {event.type} </div>
        <div> Date: {event.date} </div>
        <div><NavLink to={`/event/${event.id}`}>Go to event</NavLink></div>
    </div>
}

export default Event;