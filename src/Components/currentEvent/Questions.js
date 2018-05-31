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
    const {addQuestion} = this.props
    const {questions} = this.state
    // console.log(questions)
    return (
        <section id="questions-section">
            <h3> Questions </h3>
            <button type="button" className="btn btn-danger" onClick={addQuestion}>Add Question</button>
            <div id="setQuestions">
                {questions.map((question, i) => <Question question={question} i={i} key={i}/>)}
            </div>
            

        </section>
    );
    }
    setQuestionsArray = () => {
        const currentEvent = this.props.currentEvent
        if (currentEvent === null) return null;
        const numberOfQuestions = currentEvent.event.questions;
        const questions = [];
        for (let i = 1; i <= numberOfQuestions; i++) {
            questions.push(currentEvent[i])
            console.log(currentEvent[i])
        }
        this.setState({questions})
    }
    
}

export default Questions;