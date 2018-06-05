import React, { Component } from 'react';
import '../css/CurrentEvent.css';
import {updateQuestion, getEventIdDatabase, moveQuestionsToCurrentQuestions} from '../Functions/Firebase';
import {changeQuestion, findNextQuestion} from '../Functions/index';

import Information from '../Components/CurrentEvent/Information';
import Questions from '../Components/CurrentEvent/Questions';
import Notes from '../Components/CurrentEvent/Notes';
import Graphs from '../Components/CurrentEvent/Graphs';

class CurrentEvent extends Component {
    componentDidMount () {
        if (this.props.currentEventID.length > 0 && this.state.currentEvent.name === undefined) {
            this.getCurrentEventID();
        }
    };
    state = {
        loading: true,
        currentEvent: {},
        nextQuestion: 1
    };
    render() {
    const {currentEventID, notes, addEventNote} = this.props;
    const {currentEvent, nextQuestion} = this.state;
    const {editQuestion, updateCurrentEvent, eventClose} = this;
    if (currentEventID.length < 1) return <div> No Current Event </div>
    return (
        !this.state.loading &&
        <section id="current-event">
            <div id="current-event-left">
                <Information updateCurrentEvent={updateCurrentEvent} currentEvent={currentEvent} eventClose={eventClose} nextQuestion={nextQuestion}/>
                <Questions currentEvent={currentEvent} editQuestion={editQuestion}/>
            </div>
            <div id="current-event-right">
                <Notes notes={notes} addEventNote={addEventNote}/>
                <Graphs />
            </div>
        
        </section>
    );
    }

    // Get the current event by id
    getCurrentEventID = () => {
        return getEventIdDatabase(this.props.currentEventID)
        .then(currentEvent => {
            const nextQuestion = findNextQuestion(currentEvent)
            this.setState({currentEvent, loading : false, nextQuestion})
        })
        .catch(err => {
            console.log(err);
            return null;
        })
    }

    // Sends the new question to firebase and updates question in state
    editQuestion = (question) => {
        updateQuestion(question, this.state.currentEvent, this.props.currentEventID)
        .then((question) => {
            let currentEvent = this.state.currentEvent;
            currentEvent[question.id] = question
            this.setState({currentEvent})
        })
        .catch(err => {
            console.log(err)
            return null
        })
    }

    // Updates the clock, called in Clock every 10 secs
    updateCurrentEvent = (clock) => {
            const {changeClose, changeLive, currentEvent} = changeQuestion(clock, this.state.currentEvent, this.props.currentEventID);
            if (changeClose || changeLive) {
                this.setState({currentEvent})
            }
            if (changeClose) {
                moveQuestionsToCurrentQuestions(this.props.currentEventID)
            }
    }

    // Removes event from state --will need to work with firebase
    eventClose = () => {
        this.setState({currentEvent : {}})
        this.props.closeEvent();
    }
}

export default CurrentEvent;