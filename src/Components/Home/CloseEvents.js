import React from 'react';

function CloseEvents ({event, text}) {
  return <div className="closeEvent">
    {event ? <div> {text} </div> : <div> {text} </div>}
  </div>
}

export default CloseEvents;