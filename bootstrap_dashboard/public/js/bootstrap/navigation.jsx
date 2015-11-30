import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/dashboard.css';

var navEntries = [
    {
        "id" : 1,
        "text": "Dash Board",
        "link": "index.html"
    },
    {
        "id" : 2,
        "text": "Map",
        "link": "maps.html"
    },
    {
        "id" : 3,
        "text": "Aggregation",
        "link": "aggregation.html"
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
  render : function() {
    var navSidebarItems = navEntries.map(function(item) {
      return (
        <li key={item.id}>
          <a href={item.link}>
            <i className="fa fa-dashboard fa-fw"></i>
            {item.text}
          </a>
        </li>
      );
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
            <NavSidebar />
        </nav>
    );
  }
})

ReactDOM.render(
  <Navigation />,
  document.getElementById('react-navigation')
);
