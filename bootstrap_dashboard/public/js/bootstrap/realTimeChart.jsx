import React from 'react';
import ReactDOM from 'react-dom';
import DataBox from '../nvdcharts/stackedAreaChart.jsx';
import '../../css/dashboard.css';

var stackedAreaChartStyle = {
    height: 400
};

var PriceMonitorPanel = React.createClass({

        

    render: function() {
        return (
                <div className="col-lg-12">
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
                                        <li><a href="#">10 Min</a>
                                        </li>
                                        <li><a href="#">1 Hour</a>
                                        </li>
                                        <li><a href="#">4 Hour</a>
                                        </li>
                                        <li className="divider"></li>
                                        <li><a href="#">Separated link</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body" id="stackedChart">
                           <DataBox  url="/api/data" pollInterval={2000} />
                        </div>
                    </div>
                </div>
        );
    }
})


