import React from 'react';
import ReactDOM from 'react-dom';
import LineChart from '../nvdcharts/lineChart.jsx';
import './css/dashboard.css';

var stackedAreaChartStyle = {
    height: 400
};


var PowerConsumptionMonitorPanel = React.createClass({
    getInitialState: function() {
        this._timedur = 10;
        this._dataurlroot = "/api/v1/homehubs/aggregation/";
        return {newDataUrl: "/api/v1/homehubs/aggregation/1440"};
    },
    handleClick: function(i) {
        this._timedur = i;
        this.setState({newDataUrl: this._dataurlroot + this._timedur});
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bar-chart-o fa-fw"></i> Power Consumption Monitor
                    <div className="pull-right">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                Actions
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right" role="menu">
                                <li onClick={this.handleClick.bind(this, 10)}><a href="#">10 Min</a>
                                </li>
                                <li onClick={this.handleClick.bind(this, 60)}><a href="#">1 Hour</a>
                                </li>
                                <li onClick={this.handleClick.bind(this, 240)}><a href="#">4 Hour</a>
                                </li>
                                <li onClick={this.handleClick.bind(this, 480)}><a href="#">8 Hour</a>
                                </li>
                                <li onClick={this.handleClick.bind(this, 1440)}><a href="#">24 Hour</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="panel-body" id="powerConsumptionMonitorPanel">
                        <LineChart  url={this.state.newDataUrl}  pollInterval={2000} />
                </div>
            </div>
        );
    }
});


ReactDOM.render(
  <PowerConsumptionMonitorPanel />,
  document.getElementById('react-PowerConsumptionMonitorPanel')
);


