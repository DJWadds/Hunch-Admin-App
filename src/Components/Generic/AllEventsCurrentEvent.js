import React, { Component } from 'react';

class AllEventsCurrentEvent extends Component {
    render() {
    const {currentEvent, currentEventID} = this.props
    return (
        <section id="all-events-current-event">
            <button type="button" className="btn btn-primary">Go To Event</button>
        </section>
    );
    }
}

export default AllEventsCurrentEvent;