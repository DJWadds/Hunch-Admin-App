import React, { Component } from 'react';
import Question from '../Generic/Question';

class Questions extends Component {
    componentDidUpdate(prevrops) {
        if(prevrops !== this.props) {
            this.setQuestionsArray();
        }
    }
    state = {
        questions: []
    };
    render() {
    const {editQuestion} = this.props
    const {questions} = this.state
    // console.log(questions)
    return (
        <section id="questions-section">
            <h2> Questions </h2>
            <div id="setQuestions">
                {questions.map((question, i) => <Question question={question} i={i} key={i} editQuestion={editQuestion}/>)}
            </div>
            

        </section>
    );
    }
    setQuestionsArray = () => {
        const currentEvent = this.props.currentEvent
        if (currentEvent === null) return null;
        const numberOfQuestions = currentEvent.questions;
        const questions = [];
        for (let i = 1; i <= numberOfQuestions; i++) {
            questions.push(currentEvent[i])
        }
        this.setState({questions})
    }
    
}

export default Questions;