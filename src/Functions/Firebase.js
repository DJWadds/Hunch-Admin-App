import axios from 'axios';
import {getAllEventsURL, postNewEventURL} from '../config/index';

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

export function makeEventLive (event, index) {
    let currentEvent = {...event}
    currentEvent.questions = 6
    currentEvent.date = Date.parse(currentEvent.date)

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
            }
    }
    axios.post(makeCurrentEventLive, {currentEvent})
    .then((res) => {
        console.log(res)
        const currentEventId = res.data.eventID
        console.log(currentEventId)
        console.log(currentEvent)
        this.setState({currentEventId, currentEvent})
        return console.log(res.data.result)
    })
    .catch((err) => {
        console.log(err);
    })
}