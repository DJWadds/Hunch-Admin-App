import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/notes.css';

class Notes extends Component {
    state = {
        noteInput: ''
    }
    render() {
        const {notes} = this.props;
        const {noteInput} = this.state;
        const {updateNote, addNote} = this;
    return (
        <section id="current-event-notes">
            <div id="current-event-notes-pannel">
                {notes.map((note, index) => {
                    return <div key={index} className='note'> {note} </div>
                })}
            </div>
            <div id="current-event-notes-input">
                <input placeholder="enter comment....." onChange={updateNote} value={noteInput}/>
                <button type="button" className="btn btn-info" onClick={addNote}>Add</button>
            </div>
        </section>
    );
    }

    updateNote = (event) => {
        this.setState({noteInput : event.target.value})
    }

    addNote = () => {
        this.props.addEventNote(this.state.noteInput)
        this.setState({noteInput : ""})
    }
}

export default Notes;