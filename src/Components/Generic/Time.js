import React, { Component } from 'react';

class Time extends Component {
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
        <section id="time">
            {time.toLocaleTimeString()}
        </section>
    );
    }

    currentTime = () => {
        this.props.updateTime(this.state.time);
        this.setState({time : new Date()})
    }
}

export default Time;