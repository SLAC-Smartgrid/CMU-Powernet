var React = require('react');
var BaseWidget = require('BaseWidget');

//var Mongoose = require('mongoose');

var Widget = React.createClass({

  getInitialState: function(){
    return {name: "", data: []};
  },
  
  propTypes: {
    name: React.PropTypes.string,
    data: React.PropTypes.array
  },

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    const id = this.props.params.id

    fetchMessage(id, function (err, message) {
      this.setState({ message: message })
    })
  
  }, 

  render: function() {
    
    var devices = [{
      id: 1,
      name: "Item name 1",
      price: 100
    },{
      id: 2,
      name: "Item name 2",
      price: 100
    }];

    
    // mongoose stuff


    var style = { padding : '1rem' },
        widget = (
           <div style={ style }>
            <div className="rdb-widget">
                <div id={ this.props._id }> </div>
                <h2 className="table-name">
                    {this.props.name}
                </h2>
                <table className="table">
                    <tr>Name: 'Griffin Smith', Age: 18</tr>
                    <br/>
                    <tr>Age: 23,  Name: 'Lee Salminen' </tr>
                    <br/>
                    <tr>Age: 28, Position: 'Developer' </tr>
                    
                </table>
            </div>
          </div> 
                );    

    return (
      <BaseWidget { ...this.props } widget={ widget }/>
    );
  }
});

module.exports = Widget;
