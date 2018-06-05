import axios from 'axios';
import {
    // AllEvents
    getAllEventsURL, postNewEventURL, deleteEventUrl, 
    // Current Event
    makeCurrentEventLiveURL, updateQuestionURL, getEventByIdURL, moveQuestionsURL
    } from '../config/index';

    // All Events

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

export function deleteEventFirebase (event) {
    return axios.post(deleteEventUrl, {eventNo: event.name})
    .then((res) => {
        return console.log(res);
    })
    .catch(err => err);
}

    // Current Event

export function getEventIdDatabase (eventID) {
    return axios.post(getEventByIdURL, {eventID})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err;
    })
}

export function makeEventLiveInDatabase (event) {
    let currentEvent = {...event};
    currentEvent.questions = 6;
    let date = new Date(event.date);
    date.setHours(23);
    date.setMinutes(59);
    const setDateAndTime = Date.parse(date);
    for (let i = 1; i <= 6; i++) {
        currentEvent[i] = {
                id: i,
                question: `Input question here`,
                ans_a: 'Input choice A here',
                ans_b: 'Input choice B here',
                ans_c: 'Input choice C here',
                timeToSet: setDateAndTime,
                closed: false,
                live: false,
                answers_num: 3
            };
        currentEvent[`answers_for_Q${i}`] = {};
    }
    return axios.post(makeCurrentEventLiveURL, {currentEvent})
    .then(res => {
        const currentEventId = res.data.eventID;
        return {currentEventId, currentEvent};
    })
    .catch(err => {
        return(err);
    });
}

export function updateQuestion (questionObj, currentEvent, eventID) {
    const questionId = questionObj.id;
    return axios.post(updateQuestionURL, {eventID, questionId, questionObj})
    .then(res => {
        return questionObj
    })
    .catch(err => {
        return(err);
    });
}

export function moveQuestionsToCurrentQuestions (eventID) {
    console.log(eventID)
    axios.post(moveQuestionsURL, {eventID})
}

export function makeQuestionLiveDatabase (questionNo) {
    axios.post('https://us-central1-test-database-92434.cloudfunctions.net/changeLiveStatus', {questionNo})
}

