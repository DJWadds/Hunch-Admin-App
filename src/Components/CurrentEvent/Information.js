import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/information.css';
import Clock from '../Generic/Clock';

class Information extends Component {
    render() {
        const {currentEvent, eventClose} = this.props;

    return (<section id="current-event-information">
        <Clock/>
        
        <div id="current-event-information-buttons">
            <button type="button" className="btn btn-warning" onClick={eventClose}>Stop Event</button>
        </div>
    </section>);
    }
}

export default Information;