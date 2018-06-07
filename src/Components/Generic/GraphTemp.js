

import React from "react";
import { Doughnut } from "react-chartjs-2";

const GraphTemp = ({graphData}) => {
  console.log(graphData)
 // const { albumNamesArr, collectionPriceArr, trackCountArr } = chartData;
 const {ans_a, ans_b, ans_c} = graphData;
 //const example = [['pass', 'fail'], [7, 4]]
 
 if (!ans_a.length === undefined) {
  //const results = [ans_a.length, ans_b.length, ans_c.length]
    const data = {
      labels: [
        'Answer A', 'Answer B', 'Answer C'
      ],
      datasets: [{
        data: [ans_a.length, ans_b.length, ans_c.length],
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
    };
    return (
      <div  className='chart-container'>
        <div className='chart'>
        <Doughnut data={data} />
        </div>
      </div>
    );
  } else {
    return <h1>No Graph</h1>;
  }
};

export default GraphTemp;
