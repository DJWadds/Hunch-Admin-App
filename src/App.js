import React, { Component } from 'react';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';

class App extends Component {
  state = {
    user: false
  }
  render() {
    const {user} = this.state;
    const {login} = this;
    return (
      <div id="App">
        {user ? <Home /> : <Login login={login} />}
      </div>
    );
  }

  login = (email, password) => {
    console.log(email)
    console.log(password)
    this.setState({user : true})
  }
}

export default App;
