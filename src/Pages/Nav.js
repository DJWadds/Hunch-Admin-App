import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Nav.css';

function Nav () {
  return <section id="nav">
        <NavLink to="/events/all"><button type="button" className="btn btn-secondary">All Events</button></NavLink>
        <NavLink to="/events/currentEvent"><button type="button" className="btn btn-secondary">Current Event</button></NavLink>
        <NavLink to="/calendar"><button type="button" className="btn btn-secondary">Calendar</button></NavLink>
        <NavLink to="/admin"><button type="button" className="btn btn-secondary">Admin</button></NavLink>
        <NavLink to="/termsandconditions"><button type="button" className="btn btn-secondary">Terms & Condtions</button></NavLink>
  </section>
}

export default Nav;