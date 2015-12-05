import React from 'react';
import ReactDOM from 'react-dom';
import NVD3Chart from './lib/react-nvd3.js';
import $ from 'jquery';
import './css/nv.d3.min.css';

var LineChart = React.createClass({
  getX: function(d) {
    return d[0]
  },
  getY: function(d) {
    return d[1]
  },
  chartConfigure: function(chart) {
    chart.xAxis.tickFormat(function(d) { return d3.time.format('%X')(new Date(d)) });
    chart.yAxis.tickFormat(d3.format(',.1f'));
    chart.xAxis.axisLabel('Timestamp')
    chart.yAxis.axisLabel('Power Consumption (KW)')
  },
  getInitialState: function() {
    return {data: []};
  },
  loadDatasFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadDatasFromServer();
    setInterval(this.loadDatasFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <NVD3Chart
        type="lineChart"
        datum={this.state.data}
        useInteractiveGuideline="true"
        x={this.getX}
        y={this.getY}
        duration="300"
        configure = {this.chartConfigure} />
    );
  }
});

export default LineChart;
