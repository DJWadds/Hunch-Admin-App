import React, { Component } from 'react';
import Question from '../Generic/Question';

class Questions extends Component {
    render() {
    const {questions, addQuestion} = this.props
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

    
}

export default Questions;