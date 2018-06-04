import axios from 'axios';
import {getAllEventsURL, postNewEventURL, makeCurrentEventLiveURL, updateQuestionURL} from '../config/index';

export function getAllEventsFromDatabase () {
    return axios.get(getAllEventsURL)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    });
};

export function addEventToDatabase (event, eventName) {
    const addEvent = {eventName, event};
    return axios.post(postNewEventURL, addEvent)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

export function makeEventLiveInDatabase (event) {
    let currentEvent = {...event};
    currentEvent.questions = 6;
    const setDateAndTime = Date.parse(new Date('June 01, 2050 00:00:01'));
    for (let i = 1; i <= 6; i++) {
        currentEvent[i] = {
                id: i,
                question: `Input question here`,
                ans_a: 'Input choice A here',
                ans_b: 'Input choice B here',
                ans_c: 'Input choice C here',
                timeToSet: setDateAndTime,
                closed: false
            };
        currentEvent[`answers_for_Q${i}`] = {};
    }
    console.log({currentEvent});
    return axios.post(makeCurrentEventLiveURL, {currentEvent})
    .then(res => {
        const currentEventId = res.data.eventID;
        return {currentEventId, currentEvent};
    })
    .catch(err => {
        return(err);
    });
}

export function updateQuestion (questionObj, eventID) {
    const questionId = questionObj.id;
    return axios.post(updateQuestionURL, {eventID, questionId, questionObj})
    .then(res => {
        console.log(res)
    })
}