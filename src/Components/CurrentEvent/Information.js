import React, { Component } from 'react';

import Clock from '../Generic/Clock';

class Information extends Component {
    render() {
        const {updateCurrentEvent, currentEvent, eventClose, nextQuestion} = this.props;

        const date = new Date(currentEvent[nextQuestion].timeToSet);
        let hours = date.getHours();
        if (hours < 10) hours = `0${hours}`;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = `0${minutes}`;
        const time = `${hours}:${minutes}`;

    return (
        <section id="current-event-information">
            <Clock updateCurrentEvent={updateCurrentEvent}/>
            <div> Next Question: {nextQuestion} </div>
            <div> Next Question Time: {time} </div>
            <button type="button" className="btn btn-warning" onClick={eventClose}>Stop Event</button>
        </section>
    );
    }
}

export default Information;