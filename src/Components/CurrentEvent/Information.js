import React, { Component } from 'react';

import Clock from '../Generic/Clock';
import CurrentEvent from '../../Pages/CurrentEvent';

class Information extends Component {
    render() {
        const {updateClock, currentEvent} = this.props;
    return (
        <section id="current-event-information">
            <Clock updateClock={updateClock}/>
            <div> Next Question: {currentEvent.nextQuestion} </div>
            <div> Next Question Time: {currentEvent[currentEvent.nextQuestion].timeToSet.toLocaleTimeString().slice(0,5)} </div>
        </section>
    );
    }
}

export default Information;