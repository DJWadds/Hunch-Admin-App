import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {authenticateAdmin} from './external/login';
import './App.css';

import Login from './Components/Pages/Login';
import Nav from './Components/Generic/Nav';
import AllEvents from './Components/Pages/AllEvents';
import CurrentEvent from './Components/Pages/CurrentEvent';



class App extends Component {
  state = {
    admin: true
  }
  render() {
    const {admin} = this.state;
    const {login} = this;
    return (
    <Router>
      <div id="App">
        {admin ?  <Nav />
                  : <Login login={login} />}
        <Switch>
            <Route path="/login" render={(props) => <Login {...props} login={login}/>}/>
            <Route path="/events/currentEvent/:id" render={(props) => <CurrentEvent {...props} admin={admin}/>}/>  
            <Route exact path="/events/all" render={() => <AllEvents admin={admin}/>}/>
        </Switch>
      </div>
    </Router>
    );
  }

  login = (email, password) => {
    const authentication = authenticateAdmin(email, password)
    if (authentication === true) {
      this.setState({admin : true})
    } else {
      console.log(authentication)
    }
  }
}

export default App;
