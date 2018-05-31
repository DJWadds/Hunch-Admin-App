import React, { Component } from 'react';

class Question extends Component {
    componentDidMount () {
        
    }
    state = {
     questionInput: '',
     choiceAInput: "",  
     choiceBInput: "", 
     choiceCInput: "",
     timeToSetInput: "",
     answerInput: ""
    }
    render() {
    const {questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput} = this.state;
    const {question, i, editQuestion} = this.props
    const {updateQuestionInput, updateChoiceA, updateChoiceB, updateChoiceC, updateTimeToSet} = this;
    return (<div className="question" key={i}>
        <h3>Question {i + 1} </h3>
        <div> {question.question} </div>
        <h3> Choices </h3>
        <div className="choices">
            <div className="choice"> {question.choiceA} </div>
            <div className="choice"> {question.choiceB} </div>   
            <div className="choice"> {question.choiceC} </div>
        </div>
        <div className="question-time"> Time: {question.timeToSet} </div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#question${i}`} data-whatever="@fat">Edit</button>


        <div className="modal fade" id={`question${i}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question-question" className="col-form-label">Question:</label>
                            <input type="text" className="form-control" id="event-name" onChange={updateQuestionInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-one" className="col-form-label">Choice A:</label>
                            <input type="text" className="form-control" id="event-name" onChange={updateChoiceA}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-two" className="col-form-label">Choice B:</label>
                            <input type="text" className="form-control" id="event-name" onChange={updateChoiceB}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-three" className="col-form-label">Choice C:</label>
                            <input type="text" className="form-control" id="event-name" onChange={updateChoiceC}/>
                            <small id="chocieHelp" className="form-text text-muted">Choice three can be left blank</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-time" className="col-form-label">Question Time:</label>
                            <input type="text" className="form-control" id="event-date" onChange={updateTimeToSet}/>
                            <small id="emailHelp" className="form-text text-muted">Form: hh:mm:ss</small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={() => editQuestion(question, questionInput, choiceAInput, choiceBInput, choiceCInput, timeToSetInput)}>Change</button>
                </div>
            </div>
        </div>
        </div>
    </div>);
    }

    updateQuestionInput = (event) => {
        this.setState({questionInput : event.target.value})
    }

    updateChoiceA = (event) => {
        this.setState({choiceAInput : event.target.value})
    }

    updateChoiceB = (event) => {
        this.setState({choiceBInput : event.target.value})
    }

    updateChoiceC = (event) => {
        this.setState({choiceCInput : event.target.value})
    }

    updateTimeToSet = (event) => {
        this.setState({timeToSetInput : event.target.value})
    }
}

export default Question;