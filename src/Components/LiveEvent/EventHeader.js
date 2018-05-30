import React, { Component } from 'react';

class EventHeader extends Component {
    componentDidMount () {
    }
    state = {
        mode: 'Click Setup Button to Start'
    }
    render() {
    const {enterSetupMode} = this;
    const {mode} = this.state
    return (
        <section id="eventHeader">
            {mode === 'Click Setup Button to Start' ? 
                <button type="button" class="btn btn-danger" onClick={enterSetupMode}>Setup</button>
                :
                <button type="button" class="btn btn-danger">Pre-event Mode</button>
            }
            
            <p> Mode: {mode} </p>
        </section>
    );
    }

    enterSetupMode = () => {
        this.setState({mode: 'Pre-event Mode'})
    }
}

export default EventHeader;