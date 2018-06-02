import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css'

import {reduceToEventArray} from './Functions/index';
import {getAllEventsFromDatabase, addEventToDatabase, makeEventLiveInDatabase} from './Functions/Firebase';
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
      currentEvent: {},
      currentEventID: 'sad',
      liveEvent: false,
      notes: [1, 2, 3]
    };
    render() {
      const {admin, events, currentEvent, currentEventID, liveEvent, notes} = this.state;
      const {addEvent, makeEventLive, addEventNote} = this;
      console.log(events);
    return (<Router>
      <div id="app">
        {admin ?  
          <Nav />
          : <Login login={this.login} />}
        <Switch>
            <Route path="/events/currentEvent" render={(props) => <CurrentEvent {...props} notes={notes} currentEventID={currentEventID} currentEvent={currentEvent} addEventNote={addEventNote}/>}/>
            <Route exact path="/events/all" render={() => <AllEvents admin={admin} events={events} currentEvent={currentEvent} 
                  currentEventID={currentEventID} liveEvent={liveEvent} addEvent={addEvent} makeEventLive={makeEventLive}/>} />
        </Switch>
      </div>
    </Router>);
    }

    getAllEvents = () => {
      getAllEventsFromDatabase()
      .then(data => {
        const events = reduceToEventArray(data)
        this.setState({events})
      })
    }

    login = (email, password) => {
      const authentication = authenticateAdmin(email, password)
      if (authentication === true) {
        this.setState({admin : true})
      } else {
        console.log(authentication)
      }
    }

    addEvent = (eventName, eventType, eventDate, eventImgUrl, description) => {
      const event = {
        name: eventName,
        type: eventType,
        date: eventDate,
        img: eventImgUrl,
        description: description,
        live: false,
        start: false,
        complete: false
      }
      return addEventToDatabase(event, eventName)
      .then(data => {
        console.log(data)
        return null
      })
    }

    makeEventLive = (event, index) => {
      makeEventLiveInDatabase(event)
    }

    addEventNote = (note) => {
      const notes = this.state.notes;
      notes.push(note);
      this.setState({notes})
    }
}

export default App;