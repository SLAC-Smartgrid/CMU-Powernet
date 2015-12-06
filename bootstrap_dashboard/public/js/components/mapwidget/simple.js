import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class PowernetMap extends Component {
  constructor() {
    super();

    this.state = {
     
      lat: 37.410401,
      lng: -122.060032,
      zoom: 13,
      hh_data: [],
    };
  }
/*
  loadDatasFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
            //lat: 37.410401,
            //lng: -122.060032,
            //zoom: 13,
            hh_data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
*/
  /*componentDidMount() {
    this.loadDatasFromServer();
    setInterval(this.loadDatasFromServer, this.props.pollInterval);
  }*/
/*
  makePopup(entry){
    return (
        <Popup>
            <span> 
                { entry.name } HomeHub 
                <br/>
                ID: { entry.hh_id }
                <br/>
                Power Consumption: { entry.total_power }
                <br/>
                Online: { entry.online }
                <br/>
            </span>
        </Popup>
    );
  }

  makeMarkers(){
   
    var markers = this.state.hh_data.map(
            function(entry) {
                popup = this.makePopup(entry)
                return (
                    <Marker position={entry.position}>
                        { popup }
                    </Marker>   
                );
            }
        );
  }
*/
  render() {
    const position = [this.state.lat, this.state.lng];
    
    //markers = this.makeMarkers();  

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      
      </Map>
    );
  }
}
