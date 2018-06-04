import React, { Component } from 'react';
import '../css/CurrentEvent.css';
import {updateQuestion, getEventIdDatabase} from '../Functions/Firebase';

import Information from '../Components/CurrentEvent/Information';
import Questions from '../Components/CurrentEvent/Questions';
import Notes from '../Components/CurrentEvent/Notes';
import Graphs from '../Components/CurrentEvent/Graphs';

class CurrentEvent extends Component {
    componentDidMount () {
        this.getCurrentEventID();
    };
    state = {
        clock: new Date(),
        currentEvent: {
            complete: false,
            date: "2018/06/28 18:00:00",
            description: "Football match in Russia",
            img: "https://placeimg.com/640/480/animals",
            live: false,
            name: "Engalnd v Someone",
            questions: 6,
            start: false,
            type: "Football",
            nextQuestion: 1,
            1: {
              id: 1,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false,
            },
            2: {
              id: 2,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false
            },
            3: { 
              id: 3,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false
            },
            4: {
              id: 4,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false
            },
            5: {
              id: 5,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false
            },
            6: {
              id: 6,
              question: `Input question here`,
              choiceA: 'Input choice A here',
              choiceB: 'Input choice B here',
              choiceC: 'Input choice C here',
              usersA: [],
              usersB: [],
              usersC: [],
              timeToSet: new Date('June 01, 2020 00:00:01'),
              closed: false
            },
            answer_for_Q1: {},
            answer_for_Q2: {},
            answer_for_Q3: {},
            answer_for_Q4: {},
            answer_for_Q5: {},
            answer_for_Q6: {},
        }
    }
    render() {
    const {currentEventID, notes, addEventNote} = this.props;
    const {currentEvent} = this.state;
    const {editQuestion, updateClock, eventClose} = this;
    if (currentEventID.length < 1) return <div> No Current Event </div>
    return (
        <section id="current-event">
            <div id="current-event-left">
                <Information updateClock={updateClock} currentEvent={currentEvent} eventClose={eventClose}/>
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
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err);
        //     return null;
        // })
    }

    // Sends the new question to firebase and updates question in state
    editQuestion = (question) => {
        return updateQuestion(question, this.props.currentEventID)
        .then((data) => {
            console.log(data)
        })
        // const currentEventID = this.state.currentEventID;
        // const questionId = question.id;
        // const updateQuestionObj = {questionObj, currentEventID, questionId}
        // let currentEvent = this.state.currentEvent;
        // currentEvent[question.id] = question;
        // this.setState({currentEvent})
    }

    // Updates the clock, called in Clock every 10 secs
    updateClock = (clock) => {
            const currentEvent = this.closeQuestion();
            this.setState({currentEvent, clock})
    }

    // Removes the edit button from a question 30 seconds before timeToSet 
    closeQuestion = () => {
        const time = Date.parse(this.state.clock);
        let currentEvent = this.state.currentEvent;

        for (let i = 1; i <= this.state.currentEvent.questions; i++) {
            const questionTime = Date.parse(this.state.currentEvent[i].timeToSet)
            if (questionTime - 30000 < time && this.state.currentEvent[i].closed === false) {  
                currentEvent[i].closed = true;
                currentEvent.nextQuestion++
            }
        }  

        return currentEvent;
    }

    // Removes event from state --will need to work with firebase
    eventClose = () => {
        this.setState({currentEvent : {}})
        this.props.closeEvent();
    }
}

export default CurrentEvent;