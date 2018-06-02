import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import axios from 'axios';
import {addNewEventUrlTest, /*addNewEventUrlProject,*/ editQuestionUrl} from '../../config/index';
import '../../css/LiveEvent.css';

import Clock from '../Generic/Clock';
import EventInformation from '../currentEvent/EventInformation';
import Questions from '../currentEvent/Questions';
import EventTracker from '../currentEvent/EventTracker';
import Graphs from '../currentEvent/Graphs';

class CurrentEvent extends Component {
    componentDidMount () {
        const id = this.props.match.params.id;
        let event = getEvenById(id);
        event = event[0];
        const currentEvent = event
        this.setState({currentEvent});
    }
    state = {
        clock: new Date(),
        eventID: null,
        currentEvent: {event: {questions: 0}},
        setupDone: false
    };
    render() {
    if (!this.props.admin) return null;

    const {currentEvent, clock} = this.state;
    const {editQuestion, setupEvent, updateClock} = this;

    const currentHour = clock.getHours();
    const currentMinute = clock.getMinutes();
    const currentSecond = clock.getSeconds();

    for (let i = 1; i <= currentEvent.questions; i++) {
        
        const eventHours = currentEvent[i].timeToSet.getHours();
        const eventMinute = currentEvent[i].timeToSet.getMinutes();
        const eventSecond = currentEvent[i].timeToSet.getSeconds();
        if (eventHours === currentHour && 
            eventMinute === currentMinute &&
            eventSecond === currentSecond) {
            console.log(currentEvent[1])
        }
    }
    return (
        <section id="current-event">
            <div id="event-header-section">
                <div>
                    <button type="button" className="btn btn-primary" onClick={setupEvent}>Enter Setup</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                    <button type="button" className="btn btn-primary">Primary</button>
                </div>
                <Clock updateClock={updateClock}/>
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

    editQuestion = (question, questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput) => {
        let questionObj = {...question};
        questionObj.question = questionInput;
        questionObj.choiceA = choiceAInput;
        questionObj.choiceB = choiceBInput;
        questionObj.choiceC = choiceCInput;
        questionObj.timeToSet = new Date(`June 01, 2018 ${timeToSetInput}`);
        const eventID = this.state.eventID;
        const questionId = question.id;
        const updateQuestionObj = {questionObj, eventID, questionId}
        axios.post(editQuestionUrl, updateQuestionObj)
        .then((res) => {
            let  currentEvent = this.state.currentEvent;
            currentEvent[questionId] = questionObj;
            this.setState({currentEvent});
            return console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateClock = (time) => {
            this.setState({time});
    }
}



export default CurrentEvent;