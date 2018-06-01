import React, { Component } from 'react';

class EventTracker extends Component {
    state = {
        notes: [1, 2, 3, 4, 5, 6]
    };
    render() {
    const {notes} = this.state;
    return (
        <section id="event-tracker-section">
            <div id="event-tracker-section-notes-pannel"> 
                {notes.map((note, i) => i % 2 ? <div> {note} </div> : <div> {note} </div>)}
            </div>
        </section>
    );
    }
}

export default EventTracker;