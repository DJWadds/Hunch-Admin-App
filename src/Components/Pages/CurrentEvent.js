import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import axios from 'axios';
import {addNewEventUrlTest, /*addNewEventUrlProject,*/ editQuestionUrl} from '../../config/index';
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
        time: new Date(),
        eventID: null,
        currentEvent: {event: {questions: 0}},
        setupDone: false
    };
    render() {
    if (!this.props.admin) return null;

    const {currentEvent, time} = this.state;
    const {editQuestion, setupEvent, updateTime} = this;
    let clockTime = time.toLocaleTimeString();
    for (let i = 1; i <= currentEvent.event.questions; i++) {
        if (currentEvent[i].timeToSet === clockTime) {
            console.log(currentEvent[i]);
        }
    }
    if (time.toLocaleTimeString() === '14:24:30') {
        console.log('yessss');
    }
    return (
        <section id="current-event">
            <div id="event-header-section">
                <div>
                    <button type="button" className="btn btn-primary" onClick={setupEvent}>Enter Setup</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                </div>
                <Time updateTime={updateTime}/>
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
                timeToSet: currentEvent.event.date.slice(11),
                closed: false
                }
        }
        console.log(currentEvent)
        this.setState({setupDone : !this.state.setupDone})
        axios.post(addNewEventUrlTest, {currentEvent})
        .then((res) => {
            const eventID = res.data.eventID
            this.setState({eventID, currentEvent})
            return console.log(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    editQuestion = (question, questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput) => {
        console.log('editQuestion')
        let questionObj = question;
        questionObj.question = questionInput;
        questionObj.choiceA = choiceAInput;
        questionObj.choiceB = choiceBInput;
        questionObj.choiceC = choiceCInput;
        questionObj.timeToSet = timeToSetInput;
        const eventID = this.state.eventID;
        const questionId = question.id;
        const updateQuestionObj = {questionObj, eventID, questionId}
        axios.post(editQuestionUrl, updateQuestionObj)
        .then((res) => {
            console.log(res)
            return console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateTime = (time) => {
            this.setState({time});
    }
}



export default CurrentEvent;