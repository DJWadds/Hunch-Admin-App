import React from 'react';
import Button from '../Generic/Button';

function Event ({event, gotoEvent}) {
    return <div className="event" key={event.id}>
        <h3> {event.name} </h3>
        <p> Type: {event.type} </p>
        <p> Date: {event.date} </p>
        <Button text='Go to event' onClick={() => gotoEvent(event.id)} />
    </div>
}

export default Event;