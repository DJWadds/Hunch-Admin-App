import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import '../../css/LiveEvent.css';

import EventHeader from '../LiveEvent/EventHeader';
import EventInformation from '../LiveEvent/EventInformation';
import Questions from '../LiveEvent/Questions';
import EventTracker from '../LiveEvent/EventTracker';
import Graphs from '../LiveEvent/Graphs';

class ActiveEvent extends Component {
    componentDidMount () {
        const id = this.props.match.params.id;
        const event = getEvenById(id);
        this.setState({event: event[0]});
    }
    state = {
        event: {}
        
    };
    render() {
    const {event} = this.state;
    return (
        <section id="active-event">
            <EventHeader />
            <div id="active-event-content">
                <div id="active-event-content-left">
                    <EventInformation />
                    <Questions />
                </div>
                <div id="active-event-content-right">
                    <EventTracker />
                    <Graphs />
                </div>
            </div>
        </section>
    );
    }
}

export default ActiveEvent;