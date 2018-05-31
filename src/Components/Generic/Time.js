import React, { Component } from 'react';

class Time extends Component {
    componentDidMount () {
        setInterval(() => {
            this.currentTime();
        }, 1000);
    }
    state = {
        time: new Date
    }
    render() {
    const {time} = this.state;
    const {} = this;
    const {} = this.props
    return (
        <section id="time">
            {time.toLocaleTimeString()}
        </section>
    );
    }

    currentTime = () => {
        this.setState({time : new Date})
    }
}

export default Time;