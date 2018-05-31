import React, { Component } from 'react';

class EventHeader extends Component {
    state = {
        questions: 0
    }
    render() {
    const {updateQuestionNo} = this;
    const {event, setupEvent, setupDone} = this.props;
    const {questions} = this.state;
    return (
        <section id="eventHeader">
            {setupDone ? null : <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#event-setup" data-whatever="@fat">Setup Event</button>}

        <div className="modal fade" id="event-setup" tabIndex="-1" role="dialog" aria-labelledby="event-setup-label" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <div id="event-information">
                    <h4> Name: {event.name} </h4>
                    <h4> Type: {event.type}</h4>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="event-questions" className="col-form-label">Total number of Questions:</label>
                            <input type="text" className="form-control" id="question-total" onChange={updateQuestionNo}/>
                            <small id="questions-help" className="form-text text-muted">This can be altered later</small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={() => setupEvent(questions)}>Setup Event</button>
                </div>
            </div>
        </div>
        </div>
            
        </section>
    );
    }

    updateQuestionNo = (event) => {
        const questions = Number(event.target.value);
        this.setState({questions})
    }

}

export default EventHeader;