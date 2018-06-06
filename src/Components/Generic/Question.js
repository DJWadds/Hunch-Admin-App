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
        }
    };
    render() {
    const {
        question,
        makeQuestionLive, sendAnswer
    } = this.props;
    const {questionInput} = this.state.questionInputInfo;
    const {updateInput, setUpdateQuestion, buttonToDisplayFunc} = this;

    const date = new Date(question.timeToSet)
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    const time = `${hours}:${minutes}`;

    const buttonToDisplay = buttonToDisplayFunc();
    return (<div className="question">
        <h3> Question {question.id} </h3>
        <div id="question-question"> {question.question} </div>
        <h3> Choices </h3>
        <div className="question-choices">
            <div className="question-choices-choice" 
                id={question.answer ? question.answer === 'ans_a' ? 'correct-answer' : 'wrong-answer'
                    : 'a'}> {question.ans_a}</div>
            <div className="question-choices-choice" 
                id={question.answer ? question.answer === 'ans_b' ? 'correct-answer' : 'wrong-answer' 
                    : 'a'}> {question.ans_b}</div> 
            {question.ans_c ?
                <div className="question-choices-choice" 
                    id={question.answer ? question.answer === 'ans_c' ? 'correct-answer' : 'wrong-answer'
                        : 'a'}> {question.ans_c}</div>
                :
                <div className="question-choices-choice" id="no-choice"> n/a</div>
            }  
            
        </div>
        <div className="question-time"> Time: {time} (24hr) </div>

        <div className="question-buttons">
            {buttonToDisplay === 0 && 
                <div className="question-live-question">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#question${question.id}`} data-whatever="@fat">Edit</button>
                    <button type="button" className="btn btn-primary" onClick={() => makeQuestionLive(question.id, 'live')}>live</button>   
                </div>
            }
            {buttonToDisplay === 1 && <button type="button" className="btn btn-primary" onClick={() => makeQuestionLive(question.id, 'stop')}>Stop</button>}
            {buttonToDisplay === 2 && <div>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => sendAnswer('ans_a', question.id)}>{question.ans_a}</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => sendAnswer('ans_b', question.id)}>{question.ans_b}</button>
                {question.answers_num === 3 && <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => sendAnswer('ans_c', question.id)}>{question.ans_c}</button>}
            </div>}
        </div>

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
    </div>);
    }

    updateInput = (event, context) => {
        let questionInputInfo = this.state.questionInputInfo;
        questionInputInfo[context] = event.target.value;
        this.setState({questionInputInfo});
    }

    buttonToDisplayFunc = () => {
        const question = this.props.question;
        if (question.live) return 1;
        if (question.complete) return 3;
        if (question.closed) return 2;
        return 0;
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