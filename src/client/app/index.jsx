import React from 'react';
import {render} from 'react-dom';
import SearchFields from './SearchFields.jsx';
import MapCanvas from './MapCanvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
      radius: '500',
      location: new google.maps.LatLng(37.773972, -122.431297), // San Francisco
      places: []
    }; 
    this.geocoder = new google.maps.Geocoder();
    this.findAddress = this.findAddress.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('gmap_canvas'), {
      center: this.state.location,
      zoom: 15
    });
  }

  handleQuerySubmit(params) {
    this.setState({
      keyword: params.keyword,
      address: params.address,
      radius: params.radius
    }, this.findAddress);
  }

  findAddress() {
    // converts address into Lat and Lng coordinates
    this.geocoder.geocode( { 'address': this.state.address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {

        // center map at new address
        const addressCoords = results[0].geometry.location;
        this.map.setCenter(addressCoords);
        this.setState({
          location: addressCoords
        });

        // // and then - add new custom marker
        // var addrMarker = new google.maps.Marker({
        //     position: addressCoords,
        //     map: map,
        //     title: results[0].formatted_address,
        //     icon: 'marker.png'
        // });
   
        const options = {
          location: this.state.location,
          radius: this.state.radius,
          query: this.state.keyword
        };

        this.searchPlaces(options);
      } else {
        alert(`Geocode failed: ${status}`);
      }
    });
  }

  searchPlaces(options) {
    // searches for places given location, radius, and keyword query using Google Places text search API
    let service = new google.maps.places.PlacesService(this.map);

    service.textSearch(options, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          places: results
        });
      }
    });
  }

  render () {
    return (
      <section>
        <div id="content-container">
          <h1>Find places!</h1>
          <SearchFields handleQuerySubmit={this.handleQuerySubmit.bind(this)} />
        </div>
        <div id="map-container">
          <MapCanvas
            keyword={this.state.keyword}
            location={this.state.location}
            radius={this.state.radius}
            places={this.state.places}
            map={this.map}
          />
        </div>
      </section>

    );
  }
}

render(<App/>, document.getElementById('app'));