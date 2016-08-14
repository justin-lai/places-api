import React from 'react';
import {render} from 'react-dom';
import SearchFields from './SearchFields.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
      radius: '500',
      location: new google.maps.LatLng(37.773972, -122.431297), // San Francisco
      places: [],
      markers: [],
      infoWindows: []
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
   
        const options = {
          location: this.state.location,
          radius: this.state.radius,
          query: this.state.keyword
        };

        this.clearMarkers();
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

        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
      }
    });
  }

  clearMarkers() {
    for (let i in this.state.markers) {
      this.state.markers[i].setMap(null);
    }
    this.setState({ markers: [] });
    this.setState({ infoWindows: [] });
  }

  clearInfoWindows() {
    for (let i in this.state.infoWindows) {
      if (this.state.infoWindows[i].getMap()) {
        this.state.infoWindows[i].close();
      }
    }
  }

  createMarker(place) {
    const mark = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      title: place.name
    });
    this.setState({ markers: this.state.markers.concat([mark]) });

    const infoWindow = new google.maps.InfoWindow({
      content: `<img src=${place.icon} />
                <h3>${place.name}</h3>
                <h4>${place.formatted_address}</h4>`
    });

    google.maps.event.addListener(mark, 'click', () => {
      this.clearInfoWindows();
      infoWindow.open(this.map, mark);
    });
    this.setState({ infoWindows: this.state.infoWindows.concat([infoWindow]) });
  }

  render () {
    return (
      <section>
        <div id="content-container">
          <h1>Find places!</h1>
          <SearchFields handleQuerySubmit={this.handleQuerySubmit.bind(this)} />
        </div>
        <div id="map-container">
          <div id="gmap_canvas"></div>
        </div>
      </section>

    );
  }
}

render(<App/>, document.getElementById('app'));