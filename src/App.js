import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css'

import {reduceToEventArray} from './Functions/index';
import {getAllEventsFromDatabase, addEventToDatabase, makeEventLiveInDatabase, deleteEventFirebase} from './Functions/Firebase';
import {authenticateAdmin} from './external/login';

import Login from './Pages/Login';
import AllEvents from './Pages/AllEvents';
import Nav from './Pages/Nav';
import CurrentEvent from './Pages/CurrentEvent';

class App extends Component {
    componentDidMount () {
      this.getAllEvents();
    }
    state = {
      admin: true,
      events: [],
      comingSoon: [],
      currentEvent: {
        complete: false,
        date: "2018/06/28 18:00:00",
        description: "Football match in Russia",
        img: "https://placeimg.com/640/480/animals",
        live: false,
        name: "Engalnd v Someone",
        questions: 6,
        start: false,
        type: "Football"
      },
      currentEventID: 'xHssevAf4hiXSw3sXZQT',
      liveEvent: false,
      notes: []
    };
    render() {
      const {admin, events, currentEvent, currentEventID, liveEvent, notes, comingSoon} = this.state;
      const {addEvent, makeEventLive, addEventNote, editQuestion, closeEvent, deleteEvent} = this;
    return (<Router>
      <div id="app">
        {admin ?  
          <Nav />
          : <Login login={this.login} />}
        <Switch>
            <Route path="/events/currentEvent" render={(props) => <CurrentEvent {...props} notes={notes} currentEventID={currentEventID} addEventNote={addEventNote} editQuestion={editQuestion} closeEvent={closeEvent}/>}/>
            <Route exact path="/events/all" render={() => <AllEvents admin={admin} events={events} currentEvent={currentEvent} 
                  currentEventID={currentEventID} liveEvent={liveEvent} addEvent={addEvent} makeEventLive={makeEventLive} comingSoon={comingSoon} deleteEvent={deleteEvent}/>} />
        </Switch>
      </div>
    </Router>);
    }

    // Functions: getAllEvents, login, addEvent, makeEventLive, addEventNote, closeEvent

    // Fetchs all events from the firebase and sets to states.
    getAllEvents = () => {
      getAllEventsFromDatabase()
      .then(data => {
        let events = reduceToEventArray(data)
        const comingSoon = []
        for (let i = 0; i < 2; i++) {
          if (events.length > 0) {
            comingSoon.push(events[0])
            events.shift()
          }
        }
        this.setState({comingSoon, events})
      })
    }

    // -- Will be altered later to work with the firebase but for now imports user and 
    login = (email, password) => {
      const authentication = authenticateAdmin(email, password)
      if (authentication === true) {
        this.setState({admin : true})
      } 
    }

    // Adds an event in the database to the events collection and then resets all events state. 
    // Function addEventToDatabase imported from Functions/Firebase.js
    addEvent = (event) => {
      const eventName = event.name;
      return addEventToDatabase(event, eventName)
      .then(data => {
        const events = reduceToEventArray(data)
        const comingSoon = []
        for (let i = 0; i < 2; i++) {
          if (events.length > 0) {
            comingSoon.push(events[0])
            events.shift()
          }
        }
        this.setState({comingSoon, events})
      })
      .catch(err => {
        console.log(err)
      })
    }

    deleteEvent = (event) => {
      return deleteEventFirebase(event)
      .then(() => {
        this.getAllEvents()
      })
      .catch(err => {
        console.log(err)
      })
    }

    // Makes the current event in the database and sets to state. 
    // Function makeEventLiveInDatabase imported from Functions/Firebase.js
    makeEventLive = (event, index) => {
      return makeEventLiveInDatabase(event)
      .then(data => {
        console.log(data)
        const currentEvent = data.currentEvent;
        const currentEventID = data.currentEventId;
        console.log('event', currentEvent)
        console.log('id', currentEventID)
        this.setState({currentEvent, currentEventID})
      })
      .catch(err => {
        console.log(err)
        return null
      })
    }

    // -- Currently only works locally adding a note to array in state, will be altered to work with firebase.
    addEventNote = (note) => {
      const notes = this.state.notes;
      notes.push(note);
      this.setState({notes})
    }

    // Removes the current event from state called in current event
    closeEvent = () => {
      this.setState({
        currentEvent : {},
        currentEventID : "",
        liveEvent : false,
        notes : []
      })
    }
}

export default App;