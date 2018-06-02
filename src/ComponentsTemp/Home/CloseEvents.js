import React from 'react';
import Event from '../Generic/Event';

function CloseEvents ({event, text, gotoEvent, live}) {
  return <div className="closeEvent">
    {event ? 
      <div> 
        <h3> {text} </h3>
        <Event event={event} gotoEvent={gotoEvent} live={live}/> 
      </div> 
      : 
      <div> {text} </div>
      }
  </div>
}

export default CloseEvents;