import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import '../../css/AllEventsCurrentEvent.css';

class AllEventsCurrentEvent extends Component {
    componentDidMount() {
        this.setEventInfo();
    };
    state = {
        date: '',
        time: ''
    };
    render() {
    const {currentEvent} = this.props;
    const {date, time} = this.state;
    return (
        <section id="all-events-current-event">
            <div id="all-events-current-event-img">
                <img src={`${currentEvent.img}`} alt="current event" />
            </div>
            <div id="all-events-current-event-information">
                <h2> {currentEvent.name} </h2>
                <div> Type: {currentEvent.type} </div>
                <div> Description: {currentEvent.description} </div>
                <div> Date: {date} </div>
                <div> Time: {time} </div>
                <NavLink to="/events/currentEvent"><button type="button" className="btn btn-primary">Go To Event</button></NavLink>
            </div>
        </section>
    );
    }

    setEventInfo = () => {
        const eventDate = new Date(this.props.currentEvent.date)
        const hours = eventDate.getHours();
        let minutes = eventDate.getMinutes();
        if (minutes === 0) minutes = '00';
        const time = `${hours}:${minutes}`;

        const day = eventDate.getDate();
        const month = eventDate.getMonth();
        const year = eventDate.getFullYear();
        const date = `${day}/${month}/${year}`
        this.setState({time, date})
    }
}

export default AllEventsCurrentEvent;