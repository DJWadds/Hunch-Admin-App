import React, { Component } from 'react';
import '../css/AllEvents.css';

import AddEvent from '../Components/Generic/AddEvent';
import Event from '../Components/Generic/Event';
import AllEventsCurrentEvent from '../Components/Generic/AllEventsCurrentEvent';

class AllEvents extends Component {
    render() {
    const {events, comingSoon, currentEvent, currentEventID, liveEvent, addEvent, makeEventLive} = this.props;
    return (<section id="all-events">
    {events.length > 0 ?
    <div id="all-events-head">
        {currentEventID.length > 0 ? <div id="all-events-head-current-event">
            <h2> Current Event </h2>
            <AllEventsCurrentEvent currentEvent={currentEvent} />
        </div>
        : <h2 id="all-events-head-no-current-event"> No Current Event </h2> }
        <div id="all-events-head-coming-soon">
            <div className="all-events-coming-soon-Event">
                <h2> Coming Soon </h2>
                {comingSoon.length > 0 ? null :
                    <Event event={comingSoon[0]} key={`${events[0].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={1} live={true}/>
                }
            </div>
            <div className="all-events-head-coming-soon-Event">
                <h2> Coming Soon </h2>
                {comingSoon.length === 2 ? null :
                    <Event event={comingSoon[1]} key={`${events[1].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={1} live={true}/>
                }
            </div>
        </div>
    </div>
    : null}
        <AddEvent addEvent={addEvent} />
        <div id="all-events-all">
            {events.map((event, index) => <Event event={event} key={`${event.name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={index} live={false}/>)}
        </div>
    </section>);
    }
}

export default AllEvents;