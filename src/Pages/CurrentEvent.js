import React, { Component } from 'react';
import '../mainCss/Pages/currentEvent.css';
import {getCurrentEventFromFirebaseUsingId, updateQuestionInFireBase, makeQuestionLiveInFirebase, postAnswerToFirebase, startEvent} from '../Functions/Firebase';
import {findNextQuestion} from '../Functions/index';

import Clock from '../Components/Generic/Clock';
import Information from '../Components/CurrentEvent/Information';
import Questions from '../Components/CurrentEvent/Questions';
import Notes from '../Components/CurrentEvent/Notes';
import Graphs from '../Components/CurrentEvent/Graphs';
import Button from '../Components/Generic/Button';

class CurrentEvent extends Component {
    componentDidMount () {
        if (this.props.currentEventID.length > 0 && this.state.currentEvent.name === undefined) {
            this.getCurrentEventID();
        }
    };
    state = {
        loading: true,
        currentEvent: {},
        currentQuestion: 6,
        showLeaderboard: false
    };
    render() {
    const {
        currentEventID, notes, 
        addEventNote
    } = this.props;
    const {currentEvent, currentQuestion, showLeaderboard} = this.state;
    const {editQuestion, eventClose, eventStart, makeQuestionLive, sendAnswer, switchShowLeaderboard} = this;
    if (currentEventID.length < 1) return <div> No Current Event </div>
    return (
        !this.state.loading &&
        <section id="current-event">
                <Clock/>
                {showLeaderboard && <Information currentEvent={currentEvent} currentQuestion={currentQuestion}/>}
                <Button text="Show Leaderboard" onClick={switchShowLeaderboard} />
                <Questions currentEvent={currentEvent} editQuestion={editQuestion} makeQuestionLive={makeQuestionLive} sendAnswer={sendAnswer}/>
            <div id="current-event-bottom">
                <Notes notes={notes} addEventNote={addEventNote}/>
                <Graphs currentEvent={currentEvent} currentQuestion={currentQuestion} />
            </div>
            <div id="current-event-information-buttons">
                <button type="button" className="btn btn-warning" onClick={eventStart}>Start Event</button>
                <button type="button" className="btn btn-warning" onClick={eventClose}>Stop Event</button>
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
            if (condition === 'stop') question.closed = true;
            question.live = !question.live;
            this.editQuestion(question)
        })
    }

    sendAnswer = (answer, questionId) => {
        return postAnswerToFirebase(answer, questionId, this.props.currentEventID)
        .then(({question_id, questionAnswers}) => {
            console.log(questionAnswers)
            let question = this.state.currentEvent[question_id];
            question.complete = true;
            question.answer = answer;
            question.userAnswers = questionAnswers
            let currentQuestion = this.state.currentQuestion
            currentQuestion++
            this.setState({currentQuestion})
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

    switchShowLeaderboard = () => {
        this.setState({showLeaderboard : !this.state.showLeaderboard})
    }

    eventStart = () => {
        return startEvent(this.props.currentEventID)
        .then(totalUsers => {
            console.log(totalUsers)
        })
    }
}

export default CurrentEvent;