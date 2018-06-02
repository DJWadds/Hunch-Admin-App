import React, { Component } from 'react';
import '../css/CurrentEvent.css';

import Information from '../Components/CurrentEvent/Information';
import Questions from '../Components/CurrentEvent/Questions';
import Notes from '../Components/CurrentEvent/Notes';
import Graphs from '../Components/CurrentEvent/Graphs';

class CurrentEvent extends Component {
    render() {
    const {currentEventID, currentEvent, notes, addEventNote} = this.props
    if (currentEventID.length < 1) return <div> No Current Event </div>
    return (
        <section id="current-event">
            <div id="current-event-left">
                <Information />
                <Questions currentEvent={currentEvent}/>
            </div>
            <div id="current-event-right">
                <Notes notes={notes} addEventNote={addEventNote}/>
                <Graphs />
            </div>
        </section>
    );
    }
}

export default CurrentEvent;