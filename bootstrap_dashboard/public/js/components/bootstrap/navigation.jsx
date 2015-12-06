import React from 'react';
import ReactDOM from 'react-dom';
import './css/dashboard.css';

var navEntries = [
    {
        "id" : 1,
        "text": " Dashboard ",
        "link": "/pages/index.html"
    },
    {
        "id" : 2,
        "text": " Home Hubs ",
        "link": "#"
    },
    {
        "id" : 3,
        "text": " Map ",
        "link": "/pages/maps.html"
    },
    {
        "id" : 4,
        "text": " Aggregation ",
        "link": "/pages/aggregation.html"
    }
];

var NavTopbar = React.createClass({
  render : function() {
    return (
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Powernet Dashboard</a>
      </div>
    );
  }
});

var NavSidebar = React.createClass({
    
   getInitialState: function() {
      return {HHData: []};
   },
    
   loadDatasFromServer: function() {
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({HHData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   },

   componentDidMount:function(){
       this.loadDatasFromServer();
       setInterval(this.loadDatasFromServer, this.props.pollInterval);
   },

   render : function() {


    var homehubs = this.state.HHData;
    
    var secondLevelLinkForHH = homehubs.map(function(item) {
      return (
        <li key={item.hh_id} >
          <a href={'/pages/hh/' + item.hh_id}> {item.name} </a>
        </li>
      );
    });

    navEntries.map(function(navEntry) {
      if (navEntry.id === 2) {
        navEntry.hasSecondLevel = true;
      };
    });

    var navSidebarItems = navEntries.map(function(item) {
      if (item.hasSecondLevel === true) {
        return(
          <li key={item.id}>
            <a href={item.link}>
              <i className="fa fa-dashboard fa-fw"></i>
              {item.text}
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              {secondLevelLinkForHH}
            </ul>
          </li>
        )
      } else {
        return(
          <li key={item.id}>
            <a href={item.link}>
              <i className="fa fa-dashboard fa-fw"></i>
              {item.text}
            </a>
          </li>
        )
      }
    });

    return (
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
                {navSidebarItems}
            </ul>
        </div>
      </div>
    );
  }
});

var navigationStyle = {
  margin: 0
};

var Navigation = React.createClass({
  render : function() {
    return (
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navigationStyle}>
            <NavTopbar />
            <NavSidebar url="/homehubs" pollInterval={20000}/>
        </nav>
    );
  }
})

ReactDOM.render(
  <Navigation />,
  document.getElementById('react-navigation')
);
