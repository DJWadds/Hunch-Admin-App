import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav () {
  return <section id="nav">
        <NavLink to="/allEvents"><button type="button" class="btn btn-secondary">All Events</button></NavLink>
        <NavLink to="/calendar"><button type="button" class="btn btn-secondary">Calendar</button></NavLink>
        <NavLink to="/admin"><button type="button" class="btn btn-secondary">Admin</button></NavLink>
        <NavLink to="/termsandconditions"><button type="button" class="btn btn-secondary">Terms & Condtions</button></NavLink>
  </section>
}

export default Nav;