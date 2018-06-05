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