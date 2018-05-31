import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import axios from 'axios';
import {addNewEventUrl} from '../../config/index';
import '../../css/LiveEvent.css';

import EventInformation from '../currentEvent/EventInformation';
import Questions from '../currentEvent/Questions';
import EventTracker from '../currentEvent/EventTracker';
import Graphs from '../currentEvent/Graphs';

class ActiveEvent extends Component {
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
        questions: [
            {
                question: 'Question One?', 
                choices: ['Choice 1', 'Choice 2', 'Choice 3'],
                state: 'unsent', 
                timeToSet: '14:55' 
            },
            {
                question: 'Question Two?', 
                choices: ['Choice 1', 'Choice 2', 'Choice 3'],
                state: 'unsent', 
                timeToSet: '15:10' 
            }
        ],
        setupDone: false
    };
    render() {
    if (!this.props.admin) return null;

    const {questions} = this.state;
    const {addQuestion, editQuestion, setupEvent} = this;

    return (
        <section id="active-event">
            <div id="eventHeader">
                <button type="button" className="btn btn-primary" onClick={setupEvent}>Enter Setup</button>
                <button type="button" className="btn btn-primary">Primary</button>
                <button type="button" className="btn btn-primary">Primary</button>
            </div>
            <div id="active-event-content">
                <div id="active-event-content-left">
                    <EventInformation />
                    <Questions questions={questions} addQuestion={addQuestion} editQuestion={editQuestion}/>
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
                    question: `Question ${i}?`,
                    choiceA: '',
                    choiceB: '',
                    choiceC: '',
                    usersA: '',
                    usersB: '',
                    usersC: '',
                    timeToSet: '',
                }
        }
        console.log(currentEvent)
        this.setState({setupDone : !this.state.setupDone})
        axios.post(addNewEventUrl, {currentEvent})
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

    editQuestion = (showQuestion, index) => {
        this.setState({showQuestion, index})
    }
}



export default ActiveEvent;