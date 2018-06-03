import React, { Component } from 'react';
import '../css/CurrentEvent.css';

import Information from '../Components/CurrentEvent/Information';
import Questions from '../Components/CurrentEvent/Questions';
import Notes from '../Components/CurrentEvent/Notes';
import Graphs from '../Components/CurrentEvent/Graphs';

class CurrentEvent extends Component {
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
            }
          }
    }
    render() {
    const {currentEventID, notes, addEventNote} = this.props;
    const {currentEvent} = this.state;
    const {editQuestion, updateClock} = this;
    if (currentEventID.length < 1) return <div> No Current Event </div>
        
    return (
        <section id="current-event">
            <div id="current-event-left">
                <Information updateClock={updateClock} currentEvent={currentEvent}/>
                <Questions currentEvent={currentEvent} editQuestion={editQuestion}/>
            </div>
            <div id="current-event-right">
                <Notes notes={notes} addEventNote={addEventNote}/>
                <Graphs />
            </div>
        </section>
    );
    }

    editQuestion = (question) => {
        // const currentEventID = this.state.currentEventID;
        // const questionId = question.id;
        // const updateQuestionObj = {questionObj, currentEventID, questionId}
        let currentEvent = this.state.currentEvent;
        currentEvent[question.id] = question;
        this.setState({currentEvent})
    }
    updateClock = (clock) => {
        const currentEvent = this.closeQuestion();
        this.setState({currentEvent, clock})
    }
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
}

export default CurrentEvent;