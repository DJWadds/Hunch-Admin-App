event.liveimport React, { Component } from 'react';

class AddEvent extends Component {
    state = {
        eventName: '',
        eventType: '',
        eventDate: '',
        eventImgUrl: '',
        description: ''
    }
    render() {
    const {eventName, eventType, eventDate, eventImgUrl, description} = this.state;
    const {addEvent} = this.props;
    const {updateEventName, updateEventType, updateEventDate, updateEventImgUrl, updateEventDescription} = this;
    return (<section id="all-events-add-event">
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
                                <label htmlFor="event-description" className="col-form-label">Event Description:</label>
                                <input type="text" className="form-control" id="event-name" onChange={updateEventDescription}/>
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
                        <button type="button" className="btn btn-primary" onClick={() => addEvent(eventName, eventType, eventDate, eventImgUrl, description)} data-dismiss="modal">Add Event</button>
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

    updateEventDescription = (event) => {
        this.setState({description : event.target.value})
    }

}

export default AddEvent;

