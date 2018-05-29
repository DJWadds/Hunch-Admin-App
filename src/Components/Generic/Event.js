import React from 'react';
import { NavLink } from 'react-router-dom';

function Event ({event, gotoEvent}) {
    return <div key={event.id} className="event">
        <h3> {event.name} </h3>
        <p> Type: {event.type} </p>
        <p> Date: {event.date} </p>
        <NavLink to={`/event/${event.id}`}>Go to event</NavLink>
    </div>
}

export default Event;