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
        const {questions} = this.state;
        console.log(questions)
    return (
        <section id="current-event-questions">
            {questions.map((question) => <Question question={question} key={question.id}/>)}
        </section>
    );
    }
    setQuestionsArray = () => {
        const questions = [];
        for (let i = 1; i <= this.props.currentEvent.questions; i++) {
            questions.push(this.props.currentEvent[i])
        }
        this.setState({questions})
    }
}

export default Questions;