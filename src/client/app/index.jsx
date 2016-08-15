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
    }, this.findAddress.bind(this));
  }

  handleClickEntry(place) {
    this.markers.forEach(mark => {
      if (mark.id === place.id) {
        const infoWindow = new google.maps.InfoWindow({
          content: `<img class="info-icon" src=${place.icon} />
                    <div class="info-content-container">
                      <p class="info-name"><strong>${place.name}</strong></p>
                      <p class="info-address small">${place.formatted_address}</p>
                    </div>`
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
    // searches for places given location and keyword query using Google Places text search API
    const service = new google.maps.places.PlacesService(this.map);

    service.textSearch(options, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          places: results
        });

        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
      } else {
        alert('No results found!');
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
      content: `<img class="info-icon" src=${place.icon} />
                <div class="info-content-container">
                  <p class="info-name"><strong>${place.name}</strong></p>
                  <p class="info-address small">${place.formatted_address}</p>
                </div>`
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
    let bottomContent;
    if (this.state.show === 'list') {
      bottomContent = <PlacesList places={this.state.places} handleClickEntry={this.handleClickEntry.bind(this)} />;
    } else {
      bottomContent = <PlacesDetails place={this.state.currentPlace} returnToList={this.returnToList.bind(this)} />;
    }

    return (
      <section className="container">
        <div className="row">
          <div id="content-container" className="col-xs-4 col-md-4 no-padding">
            <div id="content-top">
              <h1 className="title">What's Around!</h1>
              <SearchFields handleQuerySubmit={this.handleQuerySubmit.bind(this)} />
            </div>
            <div id="content-bottom">
              {bottomContent}
            </div>
          </div>
          <div id="map-container" className="col-xs-8 col-md-8 no-padding">
            <div id="gmap_canvas"></div>
          </div>
        </div>
      </section>

    );
  }
}

render(<App/>, document.getElementById('app'));