import React, { Component } from 'react';
import '../../css/Event.css';

class Event extends Component {
    render() {
    const {event, index, liveEvent, makeEventLive} = this.props
    return (<section className="event">
        <h3> {event.name} </h3>
        <img src={`${event.img}`} alt="event" />
        <div> Type: {event.type} </div>
        <div> Date: {event.date} </div>
        <div className="event-buttons"> 
            <button type="button" className="btn btn-primary">Edit</button>
            <button type="button" className="btn btn-primary">Delete</button>
        </div>
            {!liveEvent ? <button type="button" className="btn btn-primary" onClick={() => makeEventLive(event, index)}>Make Live</button> : null}
    </section>);
    }
}

export default Event;