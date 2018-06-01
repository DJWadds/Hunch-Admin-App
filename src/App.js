import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css'

import {reduceToEventArray} from './Functions/index';
import {getAllEventsFromDatabase, addEventToDatabase} from './Functions/Firebase';
import {authenticateAdmin} from './external/login';

import Login from './Pages/Login';
import AllEvents from './Pages/AllEvents';
import Nav from './Pages/Nav';

class App extends Component {
    componentDidMount () {
      this.getAllEvents();
    }
    state = {
      admin: true,
      events: [],
      currentEvent: {},
      currentEventID: '',
      liveEvent: false
    };
    render() {
      const {admin, events, currentEvent, currentEventID, liveEvent} = this.state;
      const {addEvent, makeEventLive} = this;
      console.log(events);
    return (<Router>
      <div id="app">
        {admin ?  
          <Nav />
          : <Login login={this.login} />}
        <Switch>
            {/* <Route path="/events/currentEvent/:id" render={(props) => <CurrentEvent {...props} admin={admin}/>}/>   */}
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

    makeEventLive = (event) => {
      console.log(event)
    }
}

export default App;