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
        const {currentEvent, editQuestion} = this.props;
        const {questions} = this.state;
    return (
        <section id="current-event-questions">
            {questions.map((question) => <Question question={currentEvent[question]} key={currentEvent[question].id} editQuestion={editQuestion}/>)}
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

}

export default Questions;