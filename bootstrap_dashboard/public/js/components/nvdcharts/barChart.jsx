import React from 'react';
import ReactDOM from 'react-dom';
import NVD3Chart from './lib/react-nvd3.js';
import $ from 'jquery';
import './css/nv.d3.min.css';

var BarChartBox = React.createClass({
  getX: function(d) {
    return d.label;
  },
  getY: function(d) {
    return d.value;
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
    var barData = this.state.HHStatusData.map( function(hhinfo) {
      return (
        {
          "label" : hhinfo.name,
          "value" : hhinfo.total_power
        }
      );
    });

    var barChartData =[
      {
        key: "Power Consumption",
        values: barData
      }
    ];

    return (
      <NVD3Chart
        type="discreteBarChart"
        datum={barChartData}
        x={this.getX}
        y={this.getY}
        duration="1300"
        showValues="true" />
    );
  }
});

export default BarChartBox;
