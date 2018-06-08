import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/information.css';
import {allUsersArray, scoreSetter, leaderBoardSetter} from '../../Functions/index';

class Information extends Component {
    componentDidMount () {
        this.setLeaderboard();
    }
    state= {
        leaderboard: [],
    }
    render() {
        const {leaderboard} = this.state;
        console.log(leaderboard)
    return (<section id="current-event-information">
        {leaderboard.map((user) => {
            return <div className='one-player'> 
                <div className='username'> {user.user} </div>
                <div className='user-score'> Score: {user.score} </div>
            </div>
        })}        
    </section>);
    }
    setLeaderboard = () => {
        const currentQuestion = this.findQuestionNumber()
        console.log(currentQuestion)
        if (currentQuestion === 0) return null
        const currentEvent = this.props.currentEvent
        const users = allUsersArray(currentEvent, currentQuestion);
        const leaderboardScores = scoreSetter(currentEvent, currentQuestion, users);
        const leaderboard = leaderBoardSetter(leaderboardScores)
        this.setState({leaderboard})
    }

    findQuestionNumber = () => {
        const currentEvent = this.props.currentEvent;
        let currentQuestion = 0;
        for (let i = 1; i <= 6; i++) {
            if (currentEvent[i].answer) {
                currentQuestion++;
            }
        }
        return currentQuestion;
    }
}

export default Information;