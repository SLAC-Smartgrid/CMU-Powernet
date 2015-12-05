import React from 'react';
import ReactDOM from 'react-dom';
import StackedAreaChart from '../nvdcharts/stackedAreaChart.jsx';
import DonutPieChartBox from '../nvdcharts/pieChart.jsx';
import './css/dashboard.css';

var PowerConsumptionPieCompositionPanel = React.createClass({

    render: function() {
        return (
          <div className="panel panel-default">
              <div className="panel-heading">
                <i className="fa fa-bar-chart-o fa-fw"></i> Power Consumption Composition
              </div>
              <div className="panel-body" id="powerConsumptionPieChart" >
                  < DonutPieChartBox url="/api/v1/homehubs" pollInterval={2000} />
              </div>
          </div>
        );
    }
})


ReactDOM.render(
  < PowerConsumptionPieCompositionPanel />,
  document.getElementById('react-PowerConsumptionPieChart')
);


