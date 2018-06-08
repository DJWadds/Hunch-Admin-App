import React, { Component } from 'react';
import '../../mainCss/CurrentEvent/graphs.css';
import { Doughnut } from "react-chartjs-2";
import Button from '../Generic/Button';

class Graphs extends Component {
    state = {
        graphData: {
            labels: [
              'Answer A', 'Answer B', 'Answer C'
            ],
            datasets: [{
              data: [0, 0, 0],
              backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ]
            }]
        },
        questionNumber: 0,
        dataToPass: false
    };
        
    render() {
        const {currentEvent, currentQuestion} = this.props;
        const {graphData, questionNumber, dataToPass} = this.state;
        const {moveGraph} = this;
        if (graphData.data === [0, 0, 0]) <div> No Graphs </div>;
    return (<section id="current-event-graphs">
        <div id='graph'>
            <h2> Question {questionNumber} Answers </h2>
            {dataToPass ? 
                <Doughnut data={graphData} />
            :
                <h3> No Graph Data </h3>
            }

        </div>
        <div id='graph-buttons'>
            {questionNumber > 1 && <Button text="Prev" onClick={() => moveGraph('pre')} />}
            {questionNumber < 6 && <Button text="Next" onClick={() => moveGraph('next')} />}
        </div>
    </section>);
    }

    setGraph = (questionNumber) => {
        const currentEvent = this.props.currentEvent;
        if (currentEvent.length === 0) {
            this.setState({dataToPass : false})
            return null
        }
        let graphData = this.state.graphData;
        let answerScore = {ans_a: 0, ans_b: 0, ans_c: 0}
        Object.values(currentEvent[`answers_for_Q${questionNumber}`]).forEach(answer => {
            answerScore[answer]++
        });
        graphData.datasets[0].data = [answerScore.ans_a, answerScore.ans_b, answerScore.ans_c]
        this.setState({graphData, questionNumber, dataToPass : true})
    }

    moveGraph = (way) => {
        let questionNumber = this.state.questionNumber;
        if (way === 'next') questionNumber++
        if (way === 'pre') questionNumber--
        this.setGraph(questionNumber)
    }
}

export default Graphs;