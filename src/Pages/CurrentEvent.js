import React, { Component } from 'react';
// import '../css/CurrentEvent.css';
import {getCurrentEventFromFirebaseUsingId, updateQuestionInFireBase, makeQuestionLiveInFirebase, postAnswerToFirebase} from '../Functions/Firebase';
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
    const {
        currentEventID, notes, 
        addEventNote
    } = this.props;
    const {currentEvent, nextQuestion} = this.state;
    const {editQuestion, eventClose, makeQuestionLive, sendAnswer} = this;

    if (currentEventID.length < 1) return <div> No Current Event </div>
    return (
        !this.state.loading &&
        <section id="current-event">
            <div id="current-event-left">
                <Information currentEvent={currentEvent} eventClose={eventClose} nextQuestion={nextQuestion}/>
                <Questions currentEvent={currentEvent} editQuestion={editQuestion} makeQuestionLive={makeQuestionLive} sendAnswer={sendAnswer}/>
            </div>
            <div id="current-event-right">
                <Notes notes={notes} addEventNote={addEventNote}/>
                <Graphs />
            </div>
        
        </section>
    );
    }

    getCurrentEventID = () => {
        return getCurrentEventFromFirebaseUsingId(this.props.currentEventID)
        .then(currentEvent => {
            const nextQuestion = findNextQuestion(currentEvent)
            this.setState({currentEvent, loading : false, nextQuestion})
        })
        .catch(err => {
            console.log(err);
            return null;
        })
    }

    editQuestion = (question) => {
        updateQuestionInFireBase(question, this.state.currentEvent, this.props.currentEventID)
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

    makeQuestionLive = (questionId, condition) => {
        return makeQuestionLiveInFirebase(questionId)
        .then(() => {
            let question = this.state.currentEvent[questionId];
            if (condition = 'stop') question.closed = true;
            question.live = !question.live;
            this.editQuestion(question)
        })
    }

    sendAnswer = (answer, questionId) => {
        answer = `ans_${answer}`
        return postAnswerToFirebase(answer, questionId, this.props.currentEventID)
        .then((question_id) => {
            console.log(`Question ${question_id} answer set!`)
            let question = this.state.currentEvent[question_id];
            question.complete = true;
            question.answer = answer;
            this.editQuestion(question)
        })
        .catch(err => {
            console.log(err)
        })
    } 

    eventClose = () => {
        this.setState({currentEvent : {}})
        this.props.closeEvent();
    }


}

export default CurrentEvent;