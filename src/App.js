import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import {authenticateAdmin} from './external/login';
import './App.css';

import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import LiveEvent from './Components/Pages/LiveEvent';



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
        {admin ?  <div id="nav"> <NavLink to='/home' >All Events </NavLink> </div>
                  : <Login login={login} />}
        <Switch>
            <Route path="/event/:id" render={(props) => <LiveEvent {...props}/>}/>  
            <Route exact path="/home" render={() => <Home />}/>
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
