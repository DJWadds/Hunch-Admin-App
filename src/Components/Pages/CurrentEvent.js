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
        const currentEvent = event
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

    const currentHour = time.getHours();
    const currentMinute = time.getMinutes();
    const currentSecond = time.getSeconds();

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
        currentEvent.questions = 6
        currentEvent.date = Date.parse(currentEvent.date)

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
                timeToSet: new Date('June 01, 2018 00:00:01'),
                closed: false
                }
        }
        
        axios.post(addNewEventUrlTest, {currentEvent})
        .then((res) => {
            const eventID = res.data.eventID
            this.setState({
                            eventID, currentEvent,
                            setupDone : !this.state.setupDone
                        })
            return console.log(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
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

    updateTime = (time) => {
            this.setState({time});
    }
}



export default CurrentEvent;