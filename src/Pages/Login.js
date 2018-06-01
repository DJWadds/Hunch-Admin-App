import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    render() {
    const {email, password} = this.state;
    const {updateEmail, updatePassword} = this;
    const {login} = this.props
    return (
        <section id="Login">
            <form>
                <img src='/img/HunchLogo.jpg' id='logo' alt="logo" />
                <h2> Admin Login </h2>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={updateEmail} value={email}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={updatePassword} value={password}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => login(email, password)}>Login</button>
            </form>
        </section>
    );
    }

    updateEmail = (event) => {
        this.setState({email : event.target.value})
    }

    updatePassword = (event) => {
        this.setState({password : event.target.value})
    }

}

export default Login;