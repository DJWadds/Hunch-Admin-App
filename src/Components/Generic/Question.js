import React, { Component } from 'react';

class Question extends Component {
    componentDidMount () {
        
    }
    state = {
        
    }
    render() {
    const {question, i} = this.props
    return (<div className="question" key={i}>
        <h3>Question {i + 1} </h3>
        <div> {question.question} </div>
        <h3> Choices </h3>
        <div className="choices">
            <div className="choice"> {question.choiceA} </div>
            <div className="choice"> {question.choiceB} </div>   
            <div className="choice"> {question.choiceC} </div>
        </div>
        <div> Time: {question.timeToSet} </div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Edit</button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question-question" className="col-form-label">Question:</label>
                            <input type="text" className="form-control" id="event-name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-one" className="col-form-label">Choice One:</label>
                            <input type="text" className="form-control" id="event-name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-two" className="col-form-label">Choice Two:</label>
                            <input type="text" className="form-control" id="event-name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-choice-three" className="col-form-label">Choice Three:</label>
                            <input type="text" className="form-control" id="event-name"/>
                            <small id="chocieHelp" className="form-text text-muted">Choice three can be left blank</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-time" className="col-form-label">Question Time:</label>
                            <input type="text" className="form-control" id="event-date"/>
                            <small id="emailHelp" className="form-text text-muted">Form: hh:mm:ss</small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Change</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
    }
}

export default Question;