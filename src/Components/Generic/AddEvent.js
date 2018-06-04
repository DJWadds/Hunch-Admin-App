import React, { Component } from 'react';
import '../../css/AddEvent.css';

class AddEvent extends Component {
    state = {
        event: {
            name: '',
            type: '',
            day: '',
            month: '',
            year: '',
            hour: '',
            minute: '',
            imgUrl: '',
            description: ''
        }
    };
    render() {
    const {updateEvent, formatEvent} = this;
    return (<section id="all-events-add-event">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Add New Event</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="event-name" className="col-form-label">Event Name:</label>
                                <input type="text" className="form-control" id="event-name" onChange={(e) => updateEvent(e, 'name')}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-description" className="col-form-label">Event Description:</label>
                                <input type="text" className="form-control" id="event-name" onChange={(e) => updateEvent(e, 'description')}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-type" className="col-form-label">Event type:</label>
                                <input type="text" className="form-control" id="event-type" onChange={(e) => updateEvent(e, 'type')}/>
                                <small id="typeHelp" className="form-text text-muted">e.g. Football, Baseball, X-Factor, etc...</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-date" className="col-form-label">Event date:</label>
                                <div id="event-date-input">
                                    <input placeholder="dd" type="text" className="form-control" id="event-date" onChange={(e) => updateEvent(e, 'day')}/>
                                    <div className="symbol"> / </div>
                                    <input placeholder="mm" type="text" className="form-control" id="event-date" onChange={(e) => updateEvent(e, 'month')}/>
                                    <div className="symbol"> / </div>
                                    <input placeholder="yyyy" type="text" className="form-control" id="event-date" onChange={(e) => updateEvent(e, 'year')}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-time" className="col-form-label">Event time:</label>
                                <div id="event-time-input">
                                    <input placeholder="hh" type="text" className="form-control" id="event-time" onChange={(e) => updateEvent(e, 'hour')}/>
                                    <div className="symbol"> : </div>
                                    <input placeholder="mm" type="text" className="form-control" id="event-time" onChange={(e) => updateEvent(e, 'minute')}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-image-url" className="col-form-label">Event image-url:</label>
                                <input type="text" className="form-control" id="event-image-url" onChange={(e) => updateEvent(e, 'imgUrl')}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={formatEvent} data-dismiss="modal">Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    </section>)
    }

    updateEvent = (e, context) => {
        const event = this.state.event;
        event[context] = e.target.value
        this.setState({event})
    }

    formatEvent = () => {
        const event = this.state.event;
        if (event.name.length === 0 ||
            event.type.length === 0 ||
            event.description.length === 0 ||
            event.imgUrl.length === 0 
        ) {
            console.log('Details error');
            return null
        }
        const year = parseInt(event.year, 10)
        const month = parseInt(event.month, 10)
        const day = parseInt(event.day, 10)
        const hour = parseInt(event.hour, 10)
        const minute = parseInt(event.minute, 10)
        if (year < 2000 || year > 5000 || month < 1 || month > 12 || day < 1 || day > 31 ||
            hour < 0 || hour > 23 || minute < 0 || minute > 59
        ) {
            console.log('Date error');
            return null
        }
        let date = new Date()
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(0);
        date = Date.parse(date);
        const newEvent = {
            name: event.name,
            type: event.type,
            date,
            img: event.imgUrl,
            description: event.description,
            live: false,
            start: false,
            complete: false
        }
        this.props.addEvent(newEvent);
    }

}

export default AddEvent;

