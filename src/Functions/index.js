import {} from './Firebase';

export function reduceToEventArray (data) {
    const events = Object.values(data);
    return events.sort(function(a, b) {
        return  +new Date(a.date) - +new Date(b.date);
    });
};

export function findNextQuestion(currentEvent) {
    for (let i = 1; i <= currentEvent.questions; i++) {
        if (currentEvent[i].closed === false) {
            return currentEvent[i].id;
        }
    }
    return currentEvent.questions;
}

export function allUsersArray (currentEvent, currentQuestion) {
    let users = [];
    for (let i = 1; i < currentQuestion; i++) {
        let userKeys = currentEvent[`answers_for_Q${i}`];
        if (typeof userKeys === 'object') {
            userKeys = Object.keys(userKeys)
            userKeys.forEach(user_id => {
                if (!users.includes(user_id)) {
                    users.push(user_id);
                }
            });
        }
    }
    let usersObj = {};
    users.forEach(user => {
        usersObj[user] = 0;
    });
    return usersObj;
}

export function scoreSetter (currentEvent, currentQuestion, users) {
    for (let i = 1; i < currentQuestion; i++) {
        if (currentEvent) {
            Object.values(currentEvent[i].userAnswers[currentEvent[i].answer]).forEach(user => users[user]++);
        }
    }
    return users;
}

export function leaderBoardSetter (leaderboardScores) {
    const totalUsers = Object.keys(leaderboardScores).length;
    let leaderboard = []
    for (let i = 6; i >= 0; i--) {
        Object.keys(leaderboardScores).forEach(user => {
            if (leaderboardScores[user] === i) {
                let object = {};
                object.user = user;
                object.score = i;
                leaderboard.push(object);
            }
        });
    }
    return leaderboard;
}