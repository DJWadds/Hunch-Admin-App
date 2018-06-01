import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Event.css';

function Event ({event, gotoEvent, index, currentEvent, makeEventLive, liveEvent}) {
    return <div className="event">
        <h3> {event.name} </h3>
        <img src={`${event.img}`} alt="event" />
        <div> Type: {event.type} </div>
        <div> Date: {event.date} </div>
        {currentEvent.name === event.name ? 
            <NavLink><button type="button" className="btn btn-primary">Go to Event</button></NavLink>
            : null
        }
        {liveEvent ? 
            null
            :
            <div>
                <div className="eventButtons">
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-primary">Delete</button>
                </div>
                <div><button type="button" className="btn btn-primary" onClick={() => makeEventLive(event, index)}>Make Event Live</button></div>      
            </div>
        }
        
    </div>
}

export default Event;