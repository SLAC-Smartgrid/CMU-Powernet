/**
 * Entry point of the Powernet Dashboard.
 */

var React = require('react');
var style = require('rdbconf').style;

require('./helper/rdb-styler').applyStyles(style);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
