import React, { Component } from 'react';

import Clock from '../Generic/Clock';

class Information extends Component {
    render() {
        const {updateClock} = this.props;
    return (
        <section id="current-event-information">
            <Clock updateClock={updateClock}/>
        </section>
    );
    }
}

export default Information;