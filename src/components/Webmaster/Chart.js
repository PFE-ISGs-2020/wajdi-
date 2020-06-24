import React, { Component } from "react"; 
import { Doughnut,Pie } from 'react-chartjs-2';

class Chart extends Component { 
  constructor(props) {
    super(props);
    this.state = {     
        chartData:props.chartData
    };
  }
 
render() {
    return (
        <Doughnut data={this.state.chartData} />       
    );
  }
}
 
export default Chart ;