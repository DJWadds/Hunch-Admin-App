import React, { Component } from 'react';
import Button from '../Generic/Button';

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
            <input type='text' placeholder='email.....' onChange={updateEmail} value={email}/>
            <input type='password' placeholder='password.....' onChange={updatePassword} value={password}/>
            <Button text="Login" onClick={() => login(email, password)} />
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