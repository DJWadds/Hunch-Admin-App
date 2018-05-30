import React, { Component } from 'react';

class Question extends Component {
    componentDidMount () {
    }
    state = {
        
    }
    render() {
    const {question, i, editQuestion} = this.props
    return (
        <div className="question" key={i}>
            <div> Question {i}: {question.question} </div>
            <div> Choices: </div>
            <div className="choices">{question.choices.map(choice => {
                return <div className="choice"> {choice} </div>        
            })} </div>
            <div> Time: {question.timeToSet} </div>
            <button type="button" class="btn btn-info" onClick={() => editQuestion(question, i)}>Info</button>
        </div>
    );
    }
}

export default Question;