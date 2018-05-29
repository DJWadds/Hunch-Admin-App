import React, { Component } from 'react';
import {getEvenById} from '../../external/eventsList';

class ActiveEvent extends Component {
    componentDidMount () {
        const id = this.props.match.params.id;
        const event = getEvenById(id);
        this.setState({event: event[0]});
    }
    state = {
        event: {}
    };
    render() {
    const {event} = this.state;
    return (
        <section id="active-event">
            <h1> {event.name} </h1>
        </section>
    );
    }
}

export default ActiveEvent;