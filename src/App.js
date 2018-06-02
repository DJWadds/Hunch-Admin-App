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
      currentEvent: {
        complete: false,
        date: "2018/06/28 18:00:00",
        description: "Football match in Russia",
        img: "https://placeimg.com/640/480/animals",
        live: false,
        name: "Engalnd v Someone",
        questions: 6,
        start: false,
        type: "Football",
        1: {
          id: 1,
          question: `Input question here`,
          choiceA: 'Input choice A here',
          choiceB: 'Input choice B here',
          choiceC: 'Input choice C here',
          usersA: [],
          usersB: [],
          usersC: [],
          timeToSet: new Date('June 01, 2018 00:00:01'),
          closed: false,
        },
        2: {
          id: 2,
          question: `Input question here`,
          choiceA: 'Input choice A here',
          choiceB: 'Input choice B here',
          choiceC: 'Input choice C here',
          usersA: [],
          usersB: [],
          usersC: [],
          timeToSet: new Date('June 01, 2018 00:00:01'),
          closed: false
        },
        3: { 
          id: 3,
          question: `Input question here`,
          choiceA: 'Input choice A here',
          choiceB: 'Input choice B here',
          choiceC: 'Input choice C here',
          usersA: [],
          usersB: [],
          usersC: [],
          timeToSet: new Date('June 01, 2018 00:00:01'),
          closed: false
        },
        4: {
          id: 4,
          question: `Input question here`,
          choiceA: 'Input choice A here',
          choiceB: 'Input choice B here',
          choiceC: 'Input choice C here',
          usersA: [],
          usersB: [],
          usersC: [],
          timeToSet: new Date('June 01, 2018 00:00:01'),
          closed: false
        },
        5: {
          id: 5,
          question: `Input question here`,
          choiceA: 'Input choice A here',
          choiceB: 'Input choice B here',
          choiceC: 'Input choice C here',
          usersA: [],
          usersB: [],
          usersC: [],
          timeToSet: new Date('June 01, 2018 00:00:01'),
          closed: false
        },
        6: {
          id: 6,
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
      },
      currentEventID: 'sd',
      liveEvent: false,
      notes: []
    };
    render() {
      const {admin, events, currentEvent, currentEventID, liveEvent, notes} = this.state;
      const {addEvent, makeEventLive, addEventNote} = this;
      console.log(currentEvent)
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
      // makeEventLiveInDatabase(event)
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
      const currentEventID = 'sdad'
      this.setState({currentEvent, currentEventID})
    }

    addEventNote = (note) => {
      const notes = this.state.notes;
      notes.push(note);
      this.setState({notes})
    }
}

export default App;