import {updateQuestion} from './Firebase';

export function reduceToEventArray (data) {
    const events = Object.values(data);
    return events.sort(function(a, b) {
        return  +new Date(a.date) - +new Date(b.date);
    });
};

export function changeQuestion (clock, currentEvent, eventID) {
    let changeClose = false;
    let changeLive = false;
    const time = Date.parse(clock);

    for (let i = 1; i <= currentEvent.questions; i++) {
        const questionTime = currentEvent[i].timeToSet;
        if (questionTime - 40000 < time && currentEvent[i].closed === false) { 
            console.log(`Question ${currentEvent[i].id} is closed`);
            currentEvent[i].closed = true;
            updateQuestion(currentEvent[i], currentEvent, eventID);
            changeClose = true;
        } 
        // if (questionTime === time && !currentEvent[i].live) {
        //     console.log(`Question ${currentEvent[i].id} is live`);
        //     currentEvent[i].live = true;
        //     currentEvent.nextQuestion++;
        //     updateQuestion(currentEvent[i], currentEvent, eventID);
        //     makeQuestionLive()
        //     changeLive = true;
        // }
    }  
    return {changeClose, changeLive, currentEvent};
}

export function findNextQuestion(currentEvent) {
    for (let i = 1; i <= currentEvent.questions; i++) {
        if (currentEvent[i].closed === false) {
            return currentEvent[i].id;
        }
    }
    return currentEvent.questions;
}