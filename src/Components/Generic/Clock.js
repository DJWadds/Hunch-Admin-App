import React, { Component } from 'react';

class Clock extends Component {
    componentDidMount() {
        setInterval(() => {
            this.currentTime();
        }, 1000);
    }
    state = {
        time: new Date()
    };
    render() {
    const {time} = this.state;
    return (
        <section id="clock">
            {time.toLocaleTimeString()}
        </section>
    );
    }

    currentTime = () => {
        this.setState({time: new Date()})
    }
}

export default Clock;