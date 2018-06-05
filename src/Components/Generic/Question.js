import React, { Component } from 'react';
import '../../css/CurrentEvent/Question.css';
import {} from '../../Functions/Firebase';

class Question extends Component {
    componentDidMount () {
        
    }
    state = {
        questionInputInfo: {
            questionInput: this.props.question.question,
            ans_aInput: "",  
            ans_bInput: "", 
            ans_cInput: "",
            timeToSetInputHour: "",
            timeToSetInputMinute: "",
            answerInput: ""
        }
    };
    render() {
    const {
        question, liveQuestion,
        makeQuestionLive, sendAnswer
    } = this.props;
    console.log(this.props.question.question)
    const {questionInput, answerInput} = this.state.questionInputInfo;
    const {updateInput, setUpdateQuestion} = this;

    const date = new Date(question.timeToSet)
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    const time = `${hours}:${minutes}`;

    return (<div className="current-event-questions-question">
        <h3>Question {question.id} </h3>
        <div> {question.question} </div>
        <h3> Choices </h3>
        <div className="current-event-questions-question-choices">
            <div className="current-event-questions-question-choices-choice"> {question.ans_a}</div>
            <div className="current-event-questions-question-choices-choice"> {question.ans_b}</div> 
            {question.ans_c ?
                <div className="current-event-questions-question-choices-choice"> {question.ans_c}</div>
                :
                <div className="current-event-questions-question-choices-choice"> n/a</div>
            }  
            
        </div>
        <div className="current-event-questions-question-time"> Time: {time} (24hr) </div>
        {question.live ? 
        <div className="current-event-questions-question-live-question">
            <button type="button" className="btn btn-primary" onClick={() => makeQuestionLive(question.id)}>Un-live</button>   
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#question${question.id}ans`} data-whatever="@fat">Answer</button>
        </div>
        : 
        <div className="current-event-questions-question-live-question">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#question${question.id}`} data-whatever="@fat">Edit</button>
            {!liveQuestion && <button type="button" className="btn btn-primary" onClick={() => makeQuestionLive(question.id)}>Live</button>}
        </div>        
        }

        <div className="modal fade" id={`question${question.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question-question" className="col-form-label">Question:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'questionInput')} value={questionInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-one" className="col-form-label">Choice A:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'ans_aInput')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-two" className="col-form-label">Choice B:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'ans_bInput')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-three" className="col-form-label">Choice C:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'ans_cInput')}/>
                            <small id="chocieHelp" className="form-text text-muted">Choice three can be left blank</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-time" className="col-form-label">Question Time:</label>
                            <div className="question-time-input">
                                <input placeholder="hh" type="text" className="form-control" id="event-date" onChange={(event) => updateInput(event, 'timeToSetInputHour')}/>
                                <div className='symbol'> : </div>
                                <input placeholder="mm" type="text" className="form-control" id="event-date" onChange={(event) => updateInput(event, 'timeToSetInputMinute')}/>
                            </div>
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

        <div className="modal fade" id={`question${question.id}ans`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question-answer" className="col-form-label">Answer:</label>
                            <input type="text" className="form-control" id="event-name" onChange={(event) => updateInput(event, 'answerInput')}/>
                            <small id="answerHelp" className="form-text text-muted">a, b or c</small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => sendAnswer(answerInput, question.id)}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    </div>);
    }

    updateInput = (event, context) => {
        let questionInputInfo = this.state.questionInputInfo;
        questionInputInfo[context] = event.target.value;
        this.setState({questionInputInfo});
    }

    setUpdateQuestion = () => {
        let question = this.props.question;
        const questionInputInfo = this.state.questionInputInfo;
        question.question = questionInputInfo.questionInput;
        question.ans_a = questionInputInfo.ans_aInput;
        question.ans_b = questionInputInfo.ans_bInput;
        if (questionInputInfo.ans_cInput.length === 0) {
            question.answers_num = 2; 
            question.ans_c = undefined;
        } else {
            question.answers_num = 3;
            question.ans_c = questionInputInfo.ans_cInput;
        }

        let time = new Date(question.timeToSet);
        time.setHours(parseInt(questionInputInfo.timeToSetInputHour, 10));
        time.setMinutes(parseInt(questionInputInfo.timeToSetInputMinute, 10));
        question.timeToSet = Date.parse(time);

        this.props.editQuestion(question)
    }
}

export default Question;