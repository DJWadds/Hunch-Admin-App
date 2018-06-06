

import React from "react";
import { Doughnut } from "react-chartjs-2";

const GraphTemp = ({graphData}) => {
  console.log(graphData);
 // const { albumNamesArr, collectionPriceArr, trackCountArr } = chartData;
 const {ans_a, ans_b, ans_c, answers_num, correct} = graphData;
 //const example = [['pass', 'fail'], [7, 4]]
 console.log(ans_a);
 
 if (Array.isArray(ans_a)) {
  //const results = [ans_a.length, ans_b.length, ans_c.length]
    const data = {
      labels: [
        'Answer A', 'Answer B', 'Answer C'
      ],
      datasets: [{
        data: [2, 5, 9],
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
        <h2 className='chart-header'>User Answers</h2> 
        <div className='chart'>
        <Doughnut data={data} />
        </div>
      </div>
    );
  } else {
    return <h1>hi</h1>;
  }
};

export default GraphTemp;
