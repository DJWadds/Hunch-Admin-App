import React, { Component } from 'react';

import Clock from '../Generic/Clock';
import CurrentEvent from '../../Pages/CurrentEvent';

class Information extends Component {
    render() {
        const {updateClock, currentEvent, eventClose} = this.props;
    return (
        <section id="current-event-information">
            <Clock updateClock={updateClock}/>
            <div> Next Question: {currentEvent.nextQuestion} </div>
            <div> Next Question Time: {currentEvent[currentEvent.nextQuestion].timeToSet.toLocaleTimeString().slice(0,5)} </div>
            <button type="button" className="btn btn-warning" onClick={eventClose}>Stop Event</button>
        </section>
    );
    }
}

export default Information;