import React, { Component } from 'react';
import '../../css/CurrentEvent/Question.css';

class Question extends Component {
    componentDidMount () {
        
    }
    state = {
     question: {
        questionInput: '',
        choiceAInput: "",  
        choiceBInput: "", 
        choiceCInput: "",
        timeToSetInputHour: "",
        timeToSetInputMinute: "",
        answerInput: ""
     }
    }
    render() {
    const {question} = this.props
    const {updateInput, setUpdateQuestion} = this;
    return (<div className="current-event-questions-question">
        <h3>Question {question.id} </h3>
        <div> {question.question} </div>
        <h3> Choices </h3>
        <div className="current-event-questions-question-choices">
            <div className="current-event-questions-question-choices-choice"> {question.choiceA} ({question.usersA.length})</div>
            <div className="current-event-questions-question-choices-choice"> {question.choiceB} ({question.usersB.length})</div>   
            <div className="current-event-questions-question-choices-choice"> {question.choiceC} ({question.usersC.length})</div>
        </div>
        <div className="current-event-questions-question-time"> Time: {question.timeToSet.toLocaleTimeString().slice(0,5)} (24hr) </div>
        {question.closed ? null : <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#question${question.id}`} data-whatever="@fat">Edit</button>}


        <div className="modal fade" id={`question${question.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question-question" className="col-form-label">Question:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'questionInput')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-one" className="col-form-label">Choice A:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'choiceAInput')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-two" className="col-form-label">Choice B:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'choiceBInput')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-three" className="col-form-label">Choice C:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'choiceCInput')}/>
                            <small id="chocieHelp" className="form-text text-muted">Choice three can be left blank</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-time" className="col-form-label">Question Time:</label>
                            <input placeholder="hh" type="text" className="form-control" id="event-date" onChange={(event) => updateInput(event, 'timeToSetInputHour')}/>
                            <input placeholder="mm" type="text" className="form-control" id="event-date" onChange={(event) => updateInput(event, 'timeToSetInputMinute')}/>
                            <small id="emailHelp" className="form-text text-muted">Form: hh:mm</small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={setUpdateQuestion}>Change</button>
                </div>
            </div>
        </div>
        </div>
    </div>);
    }

    updateInput = (event, context) => {
        let question = this.state.question;
        question[context] = event.target.value
        this.setState({question})
    }

    setUpdateQuestion = () => {
        let question = this.props.question
        this.props.updateQuestion(question)
    }
}

export default Question;