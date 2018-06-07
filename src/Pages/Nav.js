import React from 'react';
import { NavLink } from 'react-router-dom';
import '../mainCss/nav.css';

import Button from '../Components/Generic/Button';

function Nav () {
  const height = 35;
  return (<section id="nav">
    <div id="nav-logo">
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
    <div id="nav-links">
      <NavLink to="/events/all"><Button text="All Events"/></NavLink>
      <NavLink to="/events/currentEvent"><Button text="Current Event"/></NavLink>
      <NavLink to="/calendar"><Button text="Calendar"/></NavLink>
      <NavLink to="/admin"><Button text="Admin"/></NavLink>
      <NavLink to="/termsandconditions"><Button text="Terms & Condtions"/></NavLink>
    </div>
  </section>)
}

export default Nav;