import axios from 'axios';
import {getAllEventsURL, postNewEventURL, makeCurrentEventLiveURL} from '../config/index';

export function getAllEventsFromDatabase () {
    return axios.get(getAllEventsURL)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    });
};

export function addEventToDatabase (event, eventName) {
    const addEvent = {eventName, event}
    console.log(addEvent)
    return axios.post(postNewEventURL, addEvent)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    })
}

export function makeEventLiveInDatabase (event) {
    let currentEvent = {...event}
    currentEvent.questions = 6

    for (let i = 1; i <= 6; i++) {
        currentEvent[i] = {
            id: i,
            question: `Input question here`,
            choiceA: 'Input choice A here',
            choiceB: 'Input choice B here',
            choiceC: 'Input choice C here',
            usersA: [],
            usersB: [],
            usersC: [],
            timeToSet: new Date('June 01, 2018 00:00:01'),
            closed: false
            };
    }
    console.log(currentEvent)
    return axios.post('https://us-central1-test-database-92434.cloudfunctions.net/createCurrentEvent', currentEvent)
    .then((res) => {
        console.log(res.data)
        // return {currentEventId, currentEvent}
    })
    .catch((err) => {
        console.log(err);
    })
}