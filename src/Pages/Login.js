import React, { Component } from 'react';
import '../mainCss/Pages/login.css';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    render() {
    const {email, password} = this.state;
    const {updateEmail, updatePassword} = this;
    const {login} = this.props
    const height = 35;
    return (<section id="Login">        
        <div id="login-logo">
            {/*  H */}
                <svg className="letter">
                <path
                d={`m5 5 v${height} a${height * 0.0625},${height *0.0625} 0 0,0 ${height * 0.125},0 v${height * -0.4375} a${height * 0.0625},${height * 0.0625} 0 1,1 ${height * 0.125},0 v${height * 0.4375} a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 v${-height} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 v${height * 0.325} a${height * 0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 v${height * -0.325} a${height * 0.0625},${height * .0625} 0 0,0 -${height * 0.125},0`}
                fill= 'yellow'
                stroke= 'blue'
                strokeWidth= '1'
                />
            </svg>
            {/* U */}
            <svg className="letter"> 
                <path
                d={`m5 5 v${height * 0.9}
                a${height * 0.1875},${height * 0.1875} 0 0,0 ${height * 0.375},0 v${-height * 0.9} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 v${height * 0.9} a${height * 0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 v${-height * 0.9} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0`}
                fill='red'
                stroke='orange'
                strokeWidth= '1'        
                />
            </svg>
            {/* N */}
            <svg className="letter"> 
                <path
                d={`m5 5 v${height} a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 v${height * -0.57} a${height * 0.00625},${height * 0.00625} 0 1,1 ${height * 0.0125},0 l${height * 0.1275} ${height * 0.53} a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 v${-height} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 v${height * 0.57} a${height * 0.00625},${height * 0.00625} 0 1,1 -${height * 0.0125},0 l${height * -0.1275} ${height * -0.53} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0`}
                fill='mediumvioletred'
                stroke='cornflowerblue'
                strokeWidth= '1'        
                />
            </svg>
            {/* C */}
            <svg className="letter"> 
                <path
                d={`m5 8 v${height * 0.75} a${height * 0.1875},${height * 0.1875} 0 0,0 ${height * 0.375},0 a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0   a${height * 0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 v${-height * 0.75} a${height * 0.0625},${height * 0.0625} 0 1,1 ${height * 0.125},0 a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 a${height * 0.1875},${height * 0.1875} 0 0,0 -${height * 0.375},0`}
                fill='rgb(199, 21, 133)'
                stroke='yellow'
                strokeWidth= '1'        
                />
            </svg>
            {/* H */}
            <svg className="letter"> 
                <path
                d={`m5 5 v${height} a${height * 0.0625},${height *0.0625} 0 0,0 ${height * 0.125},0 v${height * -0.4375} a${height * 0.0625},${height * 0.0625} 0 1,1 ${height * 0.125},0 v${height * 0.4375} a${height * 0.0625},${height * 0.0625} 0 0,0 ${height * 0.125},0 v${-height} a${height * 0.0625},${height * 0.0625} 0 0,0 -${height * 0.125},0 v${height * 0.325} a${height * 0.0625},${height * 0.0625} 0 1,1 -${height * 0.125},0 v${height * -0.325} a${height * 0.0625},${height * .0625} 0 0,0 -${height * 0.125},0`}
                fill= 'cornflowerblue'
                stroke= 'blue'
                strokeWidth= '1'
                />
            </svg>
        </div>
        <form>
            <h2> Admin Login </h2>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={updateEmail} value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={updatePassword} value={password}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => login(email, password)}>Login</button>
        </form>
    </section>);
    }

    updateEmail = (event) => {
        this.setState({email : event.target.value})
    }

    updatePassword = (event) => {
        this.setState({password : event.target.value})
    }

}

export default Login;