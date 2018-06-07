import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/questions.css';

import Question from '../Generic/Question';

class Questions extends Component {
    componentDidMount() {
        this.setQuestionsArray();
    };
    state = {
        questions: [],
        liveQuestion: false
    }
    render() {
        const {
            editQuestion, makeQuestionLive, sendAnswer
        } = this.props;
        const {questions, liveQuestion} = this.state;

    return (
        <section id="current-event-questions">
            {questions.map(question => <Question key={question.id} question={question} liveQuestion={liveQuestion} editQuestion={editQuestion} makeQuestionLive={makeQuestionLive} sendAnswer={sendAnswer} />)}
        </section>
    );
    }

    setQuestionsArray = () => {
        const currentEvent = this.props.currentEvent
        const questions = [];
        let liveQuestion = false;
        for (let i = 1; i <= currentEvent.questions; i++) {
            if (currentEvent[i].live) liveQuestion = true
            questions.push(currentEvent[i])
        }
        this.setState({questions, liveQuestion})
    }

}

export default Questions;