import React from 'react';
import ReactDOM from 'react-dom';
import NVD3Chart from './lib/react-nvd3.js';
import $ from 'jquery';
import './css/nv.d3.min.css';

var DonutPieChartBox = React.createClass({
  getX: function(d) {
    return d.name;
  },
  getY: function(d) {
    return d.total_power;
  },
  getInitialState: function() {
    return {HHStatusData: []};
  },
  loadDatasFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
          this.setState({HHStatusData: data});
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
        type="pieChart"
        datum={this.state.HHStatusData}
        x={this.getX}
        y={this.getY}
        duration="1300"
        donut="true"
        donutRatio="0.35" />
    );
  }
});

export default DonutPieChartBox;
