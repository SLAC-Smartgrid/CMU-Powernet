import React from 'react';
import ReactDOM from 'react-dom';
import './css/dashboard.css';
import $ from 'jquery';

var HHStatusPanel = React.createClass({
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
        var panels = [];
        var HHStatus=this.state.HHStatusData;
        for (var i = 0; i < (HHStatus.length / 3); i++) {
            var oneRow = [];
            for (var j = 0; j < 3; j++) {
                var hhindex = i * 3 + j;
                var onePanel = (
                    <div className="col-lg-3 col-md-6" key={HHStatus[hhindex].hh_id}>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-flash fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div>
                                            <div className="huge">
                                                {HHStatus[hhindex].total_power} KW
                                            </div>
                                        </div>
                                        <div>{HHStatus[hhindex].name}</div>
                                    </div>
                                </div>
                            </div>
                            <a href={'hh/' + HHStatus[hhindex].hh_id}>
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                );
                oneRow.push(onePanel);
                oneRow.key = i;
            };
            panels.push(oneRow);
        };

        var allPanels = panels.map(function(oneRow) {
                return (
                    <div className="col-lg-12" key={oneRow.key} >
                        {oneRow}
                    </div>
                );
        });

        return (
            <div>
                {allPanels}
            </div>
        );
    }
})


ReactDOM.render(
  <HHStatusPanel url="/api/v1/homehubs" pollInterval={2000} />,
  document.getElementById('react-HHStatusPannel')
);


