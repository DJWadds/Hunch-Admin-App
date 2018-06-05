import React, { Component } from 'react';
import '../../css/Event.css';

class Event extends Component {
    componentDidMount() {
        this.setEventInfo();
    };
    state = {
        date: '',
        time: ''
    };
    render() {
        const {event, index, liveEvent, live, makeEventLive, deleteEvent} = this.props;
        const {date, time} = this.state;
    return (<section className="event">
        <h3> {event.name} </h3>
        <img src={`${event.img}`} alt="event" />
        <div> {event.description} </div>
        <div> Type: {event.type} </div>
        <div> Date: {date} </div>
        <div> Time: {time} </div>
        <div className="event-buttons"> 
            <button type="button" className="btn btn-primary">Edit</button>
            <button type="button" className="btn btn-primary" onClick={() => deleteEvent(event)}>Delete</button>
        </div>
            {liveEvent ? null :
                live ? <button type="button" className="btn btn-primary" onClick={() => makeEventLive(event, index)}>Make Live</button> : null}
    </section>);
    }

    setEventInfo = () => {
        const eventDate = new Date(this.props.event.date)
        const hours = eventDate.getHours();
        let minutes = eventDate.getMinutes();
        if (minutes === 0) minutes = '00';
        const time = `${hours}:${minutes}`;

        const day = eventDate.getDate();
        const month = eventDate.getMonth() + 1;
        const year = eventDate.getFullYear();
        const date = `${day}/${month}/${year}`
        this.setState({time, date})
    }
}

export default Event;