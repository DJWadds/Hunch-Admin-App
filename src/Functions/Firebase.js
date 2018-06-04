import axios from 'axios';
import {
    // AllEvents
    getAllEventsURL, postNewEventURL, deleteEventUrl, 
    // Current Event
    makeCurrentEventLiveURL, updateQuestionURL, getEventByIdURL
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
    const body = {eventNo: event.name}
    console.log(body)
    return axios.delete(deleteEventUrl, body)
    .then((res) => {
        return console.log(res);
    })
    .catch(err => err);
}

    // Current Event

export function getEventIdDatabase (eventID) {
    console.log(eventID)
    return axios.get(getEventByIdURL, {eventID})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
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
                closed: false,
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

export function updateQuestion (questionObj, eventID) {
    const questionId = questionObj.id;
    return axios.post(updateQuestionURL, {eventID, questionId, questionObj})
    .then(res => {
        console.log(res)
    })
}

