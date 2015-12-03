var React = require('react');
var DefaultLayout = require('./layouts/default');
var HHTable = require('./layouts/HHStatusTable');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <HHTable />
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
