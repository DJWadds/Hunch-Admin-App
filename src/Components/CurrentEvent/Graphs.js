import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/graphs.css';
import GraphTemp from '../Generic/GraphTemp';

class Graphs extends Component {

    render() {
        const {results, currentQuestion} = this.props;
        console.log(this.props);
        console.log(this.state);

        let graphData;
        graphData = Object.keys(results).length ? results[currentQuestion] : {};
        console.log(graphData);

    return (<section id="current-event-graphs">
        {
            Object.keys(graphData).length ? <GraphTemp graphData={graphData} /> : <div>empty</div>
        }    
    </section>);
    }
}

export default Graphs;