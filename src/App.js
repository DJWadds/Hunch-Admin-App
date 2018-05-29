import React, { Component } from 'react';

import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import {authenticateAdmin} from './external/login';


class App extends Component {
  state = {
    admin: true
  }
  render() {
    const {admin} = this.state;
    const {login} = this;
    return (
      <div id="App">
        {admin ? <Home /> : <Login login={login} />}
      </div>
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
