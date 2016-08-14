import React from 'react';
import {render} from 'react-dom';
import SearchFields from './SearchFields.jsx';
import PlacesList from './PlacesList.jsx';
import PlacesDetails from './PlacesDetails.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
      radius: '500',
      location: new google.maps.LatLng(37.773972, -122.431297), // San Francisco
      places: [],
      currentPlace: null,
      show: 'list'
    }; 
    this.markers = [];
    this.infoWindows = [];
    this.geocoder = new google.maps.Geocoder();
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
    }, this.findAddress.bind(this));
  }

  handleClickEntry(place) {
    this.markers.forEach(mark => {
      if (mark.id === place.id) {
        const infoWindow = new google.maps.InfoWindow({
          content: `<img src=${place.icon} />
                    <p>${place.name}</p>`
        });
        this.clearInfoWindows();

        this.infoWindows.push(infoWindow);
        infoWindow.open(this.map, mark);
      }
    })
    this.setState({
      currentPlace: place,
    }, this.getDetails.bind(this));
  }

  findAddress() {
    // converts address into Lat and Lng coordinates
    this.geocoder.geocode( { 'address': this.state.address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {

        // center map at new address
        const addressCoords = results[0].geometry.location;
        this.map.setCenter(addressCoords);
        this.setState({
          location: addressCoords,
          show: 'list'
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
    const service = new google.maps.places.PlacesService(this.map);

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
    for (let i in this.markers) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.infoWindows = [];
  }

  clearInfoWindows() {
    for (let i in this.infoWindows) {
      if (this.infoWindows[i].getMap()) {
        this.infoWindows[i].close();
      }
    }
  }

  createMarker(place) {
    const mark = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      title: place.name,
      id: place.id
    });
    this.markers.push(mark);

    const infoWindow = new google.maps.InfoWindow({
      content: `<img src=${place.icon} />
                <p>${place.name}</p>`
    });

    let context = this;
    google.maps.event.addListener(mark, 'click', () => {
      this.clearInfoWindows();
      infoWindow.open(this.map, mark);

      context.setState({
        currentPlace: place,
      }, context.getDetails.bind(context));
    });
    this.infoWindows.push(infoWindow);
  }

  getDetails() {
    const request = {
      placeId: this.state.currentPlace.place_id
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.getDetails(request, (details, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          currentPlace: details,
          show: 'details'
        })
      } else {
        alert(`Details request failed: ${status}`);
      }
    });
  }

  returnToList() { this.setState({ show: 'list' }) }

  render () {
    return (
      <section>
        <div id="content-container">
          <div id="content-top">
            <h1>Find places!</h1>
            <SearchFields handleQuerySubmit={this.handleQuerySubmit.bind(this)} />
          </div>
          <div id="content-bottom">
            { this.state.show === 'list' ? 
            <PlacesList places={this.state.places} handleClickEntry={this.handleClickEntry.bind(this)} /> :
            <PlacesDetails place={this.state.currentPlace} returnToList={this.returnToList.bind(this)} />
            }
          </div>
        </div>
        <div id="map-container">
          <div id="gmap_canvas"></div>
        </div>
      </section>

    );
  }
}

render(<App/>, document.getElementById('app'));