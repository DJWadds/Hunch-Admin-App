import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';
import axios from 'axios';
import {addNewEventUrl} from '../../config/index';
import '../../css/LiveEvent.css';

import EventHeader from '../LiveEvent/EventHeader';
import EventInformation from '../LiveEvent/EventInformation';
import Questions from '../LiveEvent/Questions';
import EventTracker from '../LiveEvent/EventTracker';
import Graphs from '../LiveEvent/Graphs';

class ActiveEvent extends Component {
    componentDidMount () {
        const id = this.props.match.params.id;
        const event = getEvenById(id);
        this.setState({event: event[0]});
    }
    state = {
        event: {},
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

    const {event, questions, setupDone} = this.state;
    const {addQuestion, editQuestion, setupEvent} = this;

    return (
        <section id="active-event">
            <EventHeader setupDone={setupDone} setupEvent={setupEvent} event={event}/>
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

    setupEvent = (questions) => {
        let event = this.state.event
        event.questions = questions
        let liveEvent = {event}
        for (let i = 0; i < questions; i++) {
            liveEvent[i + 1] = {
                    question: `Question ${i+1}?`,
                    choiceA: '',
                    choiceB: '',
                    choiceC: '',
                    usersA: '',
                    usersB: '',
                    usersC: '',
                    timeToSet: ''
                }
        }
        console.log(liveEvent)
        this.setState({setupDone : !this.state.setupDone})
        event = JSON.stringify(event)
        axios.post(addNewEventUrl, {event})
        .then((res) => {
            console.log(res)
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