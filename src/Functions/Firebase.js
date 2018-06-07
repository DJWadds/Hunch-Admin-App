import axios from 'axios';
import {
    getAllEventsFromFirebaseURL,
    postEventToFirebaseURL,
    deleteEventFromFirebaseURL,
    postCurrentEventToFirebaseURL,
    getCurrentEventFromFirebaseUsingIdURL,
    updateQuestionInFireBaseURL,
    moveAllQuestionsToCurrentQuestionsCollectionInFirebaseURL,
    makeQuestionLiveInFirebaseURL,
    postAnswerToFirebaseURL
} from '../api/index';

/* AVAILABLE FUNCTIONS
1 - GET ALL EVENTS FROM FIREBASE
2 - POST EVENT TO FIREBASE
3 - DELETE EVENT FROM FIREBASE

4 - POST CURRENT EVENT TO FIRBASE
5 - GET CURRENT EVENT FROM FIREBASE USING ID
6 - UPDATE QUESTION IN FIREBASE

7 - MOVE ALL QUESTIONS TO CURRENT QUESTION COLLECTION IN FIREBASE -- INTERNAL
8 - MAKE QUESTIONS LIVE IN FIREBASE
9 - POST ANSWER TO FIREBASE
*/

// 1 - GET ALL EVENTS FROM FIREBASE
export function getAllEventsFromFirebase () {
    return axios.get(getAllEventsFromFirebaseURL)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    });
};

// 2 - POST EVENT TO FIREBASE
export function postEventToFirebase (event, eventName) {
    const addEvent = {eventName, event};
    return axios.post(postEventToFirebaseURL, addEvent)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

// 3 - DELETE EVENT FROM FIREBASE
export function deleteEventFromFirebase (event) {
    return axios.post(deleteEventFromFirebaseURL, {eventNo: event.name})
    .then((res) => {
        return console.log(res);
    })
    .catch(err => err);
}

// 4 - POST CURRENT EVENT TO FIRBASE
export function postCurrentEventToFirebase (event) {
    let currentEvent = {...event};
    currentEvent.total_users = 0;
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
                complete: false,
                answers_num: 3,
                answer: false,
                userAnswers: {}
            };
        currentEvent[`answers_for_Q${i}`] = {};
    }
    return axios.post(postCurrentEventToFirebaseURL, {currentEvent})
    .then(res => {
        const currentEventId = res.data.eventID;
        moveAllQuestionsToCurrentQuestionsCollectionInFirebase(currentEventId)
        return {currentEventId, currentEvent};
    })
    .catch(err => {
        return(err);
    });
}

// 5 - GET CURRENT EVENT FROM FIREBASE USING ID
export function getCurrentEventFromFirebaseUsingId (eventID) {
    return axios.post(getCurrentEventFromFirebaseUsingIdURL, {eventID})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err;
    })
}

// 6 - UPDATE QUESTION IN FIREBASE
export function updateQuestionInFireBase (questionObj, currentEvent, eventID) {
    const questionId = questionObj.id;
    return axios.post(updateQuestionInFireBaseURL, {eventID, questionId, questionObj})
    .then(res => {
        moveAllQuestionsToCurrentQuestionsCollectionInFirebase(eventID)
        return questionObj
    })
    .catch(err => {
        return(err);
    });
}

// 7 - MOVE ALL QUESTIONS TO CURRENT QUESTION COLLECTION IN FIREBASE
function moveAllQuestionsToCurrentQuestionsCollectionInFirebase (eventID) {
    axios.post(moveAllQuestionsToCurrentQuestionsCollectionInFirebaseURL, {eventID})
}

// 8 - MAKE QUESTIONS LIVE IN FIREBASE
export function makeQuestionLiveInFirebase (questionNo) {
    return axios.post(makeQuestionLiveInFirebaseURL, {questionNo})
    .then(res => {
        console.log(`Question ${questionNo} is live!`)
        return questionNo
    })
    .catch(err => {
        console.log(err)
        return null
    })
}

// 9 - POST ANSWER TO FIREBASE
export function postAnswerToFirebase (answer, question, event_id) {
    return axios.post(postAnswerToFirebaseURL, {correct: answer, question: `${question}`, event_id}) 
    .then((res) => {
        const question_id = question
        const questionAnswers = res.data.results[question_id];
        return {question_id, questionAnswers}
    })
    .catch(err => {
        return null
    })
}   