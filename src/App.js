import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './mainCss/index.css';

import {reduceToEventArray} from './Functions/index';
import {getAllEventsFromFirebase, postEventToFirebase, deleteEventFromFirebase, postCurrentEventToFirebase} from './Functions/Firebase';
import {authenticateAdmin} from './external/login';

import Login from './Pages/Login';
import AllEvents from './Pages/AllEvents';
import Nav from './Pages/Nav';
import CurrentEvent from './Pages/CurrentEvent';

class App extends Component {
    componentDidMount () {
      this.getAllEvents();
      this.checkForID();
    }
    state = {
      admin: true,
      events: [],
      comingSoon: [],
      currentEvent: {},
      currentEventID: 'gWgLHI2KSPvSe9COSu41',
      liveEvent: false,
      notes: [],
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
            <Route path="/events/currentEvent" render={(props) => <CurrentEvent {...props} admin={admin} notes={notes} currentEventID={currentEventID} addEventNote={addEventNote} editQuestion={editQuestion} closeEvent={closeEvent}/>}/>
            <Route exact path="/events/all" render={() => <AllEvents admin={admin} events={events} currentEvent={currentEvent} 
                  currentEventID={currentEventID} liveEvent={liveEvent} addEvent={addEvent} makeEventLive={makeEventLive} comingSoon={comingSoon} deleteEvent={deleteEvent}/>} />
        </Switch>
      </div>
    </Router>);
    }
    
    getAllEvents = () => {
      getAllEventsFromFirebase()
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

    login = (email, password) => {
      const authentication = authenticateAdmin(email, password)
      if (authentication === true) {
        this.setState({admin : true})
      } 
    }

    addEvent = (event) => {
      const eventName = event.name;
      return postEventToFirebase(event, eventName)
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
      return deleteEventFromFirebase(event)
      .then(() => {
        this.getAllEvents()
      })
      .catch(err => {
        console.log(err)
      })
    }

    makeEventLive = (event, index) => {
      localStorage.setItem('currentEvent', JSON.stringify(event));
      return postCurrentEventToFirebase(event)
      .then(data => {
        const currentEvent = data.currentEvent;
        const currentEventID = data.currentEventId;
        this.deleteEvent(event);
        localStorage.setItem('currentEventID', currentEventID);
        this.setState({currentEvent, currentEventID, liveEvent : true});
      })
      .catch(err => {
        console.log(err)
        return null
      })
    }

    checkForID = () => {
      const currentEventID = localStorage.getItem('currentEventID');
      const currentEvent = JSON.parse(localStorage.getItem('currentEvent'));
      if (currentEventID) this.setState({currentEventID, currentEvent});
    }

    addEventNote = (note) => {
      const notes = this.state.notes;
      notes.push(note);
      this.setState({notes})
    }

    closeEvent = () => {
      localStorage.setItem('currentEventID', '')
      localStorage.setItem('currentEvent', '')
      this.setState({
        currentEvent : {},
        currentEventID : "",
        liveEvent : false,
        notes : []
      })
    }

}

export default App;