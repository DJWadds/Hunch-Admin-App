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
        if (this.state.time.getSeconds() % 10 === 0) {
            this.props.updateClock(this.state.time);
        }
        this.setState({time: new Date()})
    }
}

export default Clock;