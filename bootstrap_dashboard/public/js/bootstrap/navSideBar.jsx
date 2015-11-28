import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/dashboard.css';

var NavSidebar = React.createClass({
  render : function() {
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
        }
    ];

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

ReactDOM.render(
  <NavSidebar />,
  document.getElementById('navSideBar')
);
