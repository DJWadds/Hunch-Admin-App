import React, { Component } from 'react';
import '../css/AllEvents.css';

import AddEvent from '../Components/Generic/AddEvent';
import Event from '../Components/Generic/Event';

class AllEvents extends Component {

    render() {
    const {events, currentEvent, currentEventID, liveEvent, addEvent, makeEventLive} = this.props
    return (<section id="all-events">
    {events.length > 0 ?
    <div id="all-events-head">
        {currentEventID.length > 0 ? <div id="all-events-head-current-event">
            <Event event={currentEvent} key={`${currentEvent.name}`} liveEvent={liveEvent}/>
        </div>
        : <h2 id="all-events-head-no-current-event"> No Current Event </h2> }
        <div id="all-events-head-coming-soon">
            <div className="all-events-coming-soon-Event">
                <h2> Coming Soon </h2>
                <Event event={events[0]} key={`${events[0].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={0}/>
            </div>
            <div className="all-events-head-coming-soon-Event">
                <h2> Coming Soon </h2>
                <Event event={events[1]} key={`${events[1].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={1}/>
            </div>
        </div>
    </div>
    : null}
        <AddEvent addEvent={addEvent} />
        <div id="all-events-all">
            {events.map((event, index) => <Event event={event} key={`${event.name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={index}/>)}
        </div>
    </section>);
    }

}

export default AllEvents;