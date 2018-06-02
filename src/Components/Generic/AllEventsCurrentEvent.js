import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/AllEventsCurrentEvent.css';

class AllEventsCurrentEvent extends Component {
    render() {
    const {currentEvent} = this.props
    return (
        <section id="all-events-current-event">
            <div id="all-events-current-event-img">
                <img src={`${currentEvent.img}`} alt="current event" />
            </div>
            <div id="all-events-current-event-information">
                <h2> {currentEvent.name} </h2>
                <div> Type: {currentEvent.type} </div>
                <div> Description: {currentEvent.description} </div>
                <div> Date: {currentEvent.date} </div>
                <NavLink to="/events/currentEvent"><button type="button" className="btn btn-primary">Go To Event</button></NavLink>
            </div>
        </section>
    );
    }
}

export default AllEventsCurrentEvent;