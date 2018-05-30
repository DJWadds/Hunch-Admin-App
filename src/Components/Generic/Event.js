import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Event.css';

function Event ({event, gotoEvent}) {
    return <div className="event">
        <h3> {event.name} </h3>
        <img src={`${event.img}`} alt="event" />
        <div> Type: {event.type} </div>
        <div> Date: {event.date} </div>
        <div><NavLink to={`/event/${event.id}`}><button type="button" className="btn btn-primary">Got To Event</button></NavLink></div>
    </div>
}

export default Event;