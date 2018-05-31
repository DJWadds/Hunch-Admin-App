import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import axios from 'axios';
import {addNewEventUrlTest, addNewEventUrlProject} from '../../config/index';
import '../../css/LiveEvent.css';

import Time from '../Generic/Time';
import EventInformation from '../currentEvent/EventInformation';
import Questions from '../currentEvent/Questions';
import EventTracker from '../currentEvent/EventTracker';
import Graphs from '../currentEvent/Graphs';

class CurrentEvent extends Component {
    componentDidMount () {
        const id = this.props.match.params.id;
        let event = getEvenById(id);
        event = event[0];
        const currentEvent = {event}
        this.setState({currentEvent});
    }
    state = {
        eventId: null,
        currentEvent: null,
        setupDone: false
    };
    render() {
    if (!this.props.admin) return null;

    const {currentEvent} = this.state;
    const {editQuestion, setupEvent} = this;

    return (
        <section id="current-event">
            <div id="event-header-section">
                <div>
                    <button type="button" className="btn btn-primary" onClick={setupEvent}>Enter Setup</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                </div>
                <Time />
            </div>
            <div id="active-event-content">
                <div id="active-event-content-left">
                    <EventInformation />
                    <Questions currentEvent={currentEvent} editQuestion={editQuestion}/>
                </div>
                <div id="active-event-content-right">
                    <EventTracker />
                    <Graphs />
                </div>
            </div>
        </section>
    );
    }

    setupEvent = () => {
        let currentEvent = this.state.currentEvent
        currentEvent.event.questions = 6
        for (let i = 1; i <= 6; i++) {
            currentEvent[i] = {
                id: i,
                question: `Input question here`,
                choiceA: 'Input choice A here',
                choiceB: 'Input choice B here',
                choiceC: 'Input choice C here',
                usersA: [],
                usersB: [],
                usersC: [],
                timeToSet: 'Format: hh:mm:ss',
                }
        }
        console.log(currentEvent)
        this.setState({setupDone : !this.state.setupDone})
        axios.post(addNewEventUrlTest, {currentEvent})
        .then((res) => {
            const eventId = res.data.eventID
            this.setState({eventId, currentEvent})
            return console.log(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addQuestion = () => {
        let questions = this.state.questions;
        questions.push({
            question: `Question to set?`,
            choiceA: '',
            choiceB: '',
            choiceC: '',
            usersA: '',
            usersB: '',
            usersC: '',
            timeToSet: ''
        })
       this.setState({questions})
    }

    editQuestion = (question, questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput) => {
        question.question = questionInput
        question.choiceA = choiceAInput
        question.choiceB = choiceBInput
        question.choiceC = choiceCInput
        question.timeToSet = timeToSetInput
    }
}



export default CurrentEvent;