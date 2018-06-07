import React, { Component } from 'react';
import '../css/AllEvents.css';

import AddEvent from '../Components/Generic/AddEvent';
import Event from '../Components/Generic/Event';
import AllEventsCurrentEvent from '../Components/Generic/AllEventsCurrentEvent';

class AllEvents extends Component {
    render() {
    const {admin, events, comingSoon, currentEvent, currentEventID, liveEvent, addEvent, makeEventLive, deleteEvent} = this.props;
    if (!admin) return null;
    return (<section id="all-events">
    <div id="all-events-head">

        <div id="all-events-head-current-event">
            <h2> Current Event </h2>
            {currentEventID.length > 0 ? 
                <AllEventsCurrentEvent currentEvent={currentEvent} />
                : <h2 id="all-events-head-no-current-event"> No Current Event </h2>}
        </div>
         

        <div id="all-events-head-coming-soon">
            <div className="all-events-coming-soon-Event">
                <h2> Coming Soon </h2>
                {
                    comingSoon.length > 0 && <Event event={comingSoon[0]} key={`${comingSoon[0].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={1} live={true} deleteEvent={deleteEvent}/>
                }
            </div>
            <div className="all-events-head-coming-soon-Event">
                <h2> Coming Soon </h2>
                {
                    comingSoon.length === 2 && <Event event={comingSoon[1]} key={`${comingSoon[1].name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={1} live={true} deleteEvent={deleteEvent}/>
                }
            </div>
        </div>
    </div>
        <AddEvent addEvent={addEvent} />
        <div id="all-events-all">
            {events.map((event, index) => <Event event={event} key={`${event.name}`} liveEvent={liveEvent} makeEventLive={makeEventLive} index={index} live={false} deleteEvent={deleteEvent}/>)}
        </div>
    </section>);
    }
}

export default AllEvents;