import React from 'react';
import ReactDOM from 'react-dom';
import StackedAreaChart from '../nvdcharts/stackedAreaChart.jsx';
import DonutPieChartBox from '../nvdcharts/pieChart.jsx';
import BarChartBox from '../nvdcharts/barChart.jsx';
import './css/dashboard.css';

var PowerConsumptionBarCompositionPanel = React.createClass({

    render: function() {
        return (
          <div className="panel panel-default">
              <div className="panel-heading">
                <i className="fa fa-bar-chart-o fa-fw"></i> Power Consumption Composition
              </div>
              <div className="panel-body" id="powerConsumptionBarChart" >
                  < BarChartBox />
              </div>
          </div>
        );
    }
})


ReactDOM.render(
  < PowerConsumptionBarCompositionPanel />,
  document.getElementById('react-PowerConsumptionBarChart')
);


