import React, { Component } from 'react';
import '../../css/CurrentEvent/Questions.css';

import Question from '../Generic/Question';

class Questions extends Component {
    componentDidMount() {
        this.setQuestionsArray();
    };
    state = {
        questions: []
    }
    render() {
        const {currentEvent} = this.props;
        const {questions} = this.state;
        const {updateQuestion} = this;
    return (
        <section id="current-event-questions">
            {questions.map((question) => <Question question={currentEvent[question]} key={currentEvent[question].id} updateQuestion={updateQuestion}/>)}
        </section>
    );
    }
    setQuestionsArray = () => {
        const questions = [];
        for (let i = 1; i <= this.props.currentEvent.questions; i++) {
            questions.push(i)
        }
        this.setState({questions})
    }

    updateQuestion = (question, questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput) => {
        let newQuestion = {...question};
        newQuestion.question = questionInput;
        newQuestion.choiceA = choiceAInput;
        newQuestion.choiceB = choiceBInput;
        newQuestion.choiceC = choiceCInput;

        const timeToSetHour = parseInt(timeToSetInput[0] + timeToSetInput[1], 10)
        const timeToSetMins = parseInt(timeToSetInput[3] + timeToSetInput[4], 10)
        let date = new Date();
        date.setHours(timeToSetHour)
        date.setMinutes(timeToSetMins)
        date.setSeconds(0)
        newQuestion.timeToSet = date;
        this.props.editQuestion(newQuestion)
    }
}

export default Questions;