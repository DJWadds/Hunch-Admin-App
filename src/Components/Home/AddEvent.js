import React, { Component } from 'react';

class AddEvent extends Component {
    componentDidMount () {
    }
    state = {
        eventName: '',
        eventType: '',
        eventDate: '',
        eventImgUrl: '',
        questions: 0
    }
    render() {
    const {eventName, eventType, eventDate, eventImgUrl, questions} = this.state;
    const {addEvent} = this.props;
    const {updateEventName, updateEventType, updateEventDate, updateEventImgUrl} = this;
    return (<section id="addEvent">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Add New Event</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="event-name" className="col-form-label">Event Name:</label>
                                <input type="text" className="form-control" id="event-name" onChange={updateEventName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-type" className="col-form-label">Event type:</label>
                                <input type="text" className="form-control" id="event-type" onChange={updateEventType}/>
                                <small id="typeHelp" className="form-text text-muted">e.g. Football, Baseball, X-Factor, etc...</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-date" className="col-form-label">Event date:</label>
                                <input type="text" className="form-control" id="event-date" onChange={updateEventDate}/>
                                <small id="emailHelp" className="form-text text-muted">Form: yyyy/mm/dd hh:mm:ss</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-image-url" className="col-form-label">Event image-url:</label>
                                <input type="text" className="form-control" id="event-image-url" onChange={updateEventImgUrl}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addEvent(eventName, eventType, eventDate, eventImgUrl, questions)}>Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    </section>)
    }
    updateEventName = (event) => {
        this.setState({eventName : event.target.value})
    }

    updateEventType = (event) => {
        this.setState({eventType : event.target.value})
    }

    updateEventDate = (event) => {
        this.setState({eventDate : event.target.value})
    }

    updateEventImgUrl = (event) => {
        this.setState({eventImgUrl : event.target.value})
    }

}

export default AddEvent;

