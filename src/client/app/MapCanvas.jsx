import React, { PropTypes } from 'react';

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      infoWindows: [],
    };
    // this.geocoder = new google.maps.Geocoder();
  }

  componentWillReceiveProps(nextProps) {
    const places = nextProps.places;
    
    for (let i = 0; i < places.length; i++) {
      this.createMarker(places[i]);
    }
  }

  // findAddress(queryParams) {
  //   // converts address into Lat and Lng coordinates
  //   this.geocoder.geocode( { 'address': queryParams.address}, (results, status) => {
  //     if (status == google.maps.GeocoderStatus.OK) {

  //       // center map at new address
  //       var addressCoords = results[0].geometry.location;
  //       this.map.setCenter(addressCoords);
  //       this.setState({
  //         location: addressCoords
  //       });

  //       // // and then - add new custom marker
  //       // var addrMarker = new google.maps.Marker({
  //       //     position: addressCoords,
  //       //     map: map,
  //       //     title: results[0].formatted_address,
  //       //     icon: 'marker.png'
  //       // });
   
  //       const options = {
  //         location: addressCoords,
  //         radius: queryParams.radius,
  //         query: queryParams.keyword
  //       };

  //       this.searchPlaces(options);
  //     } else {
  //       alert(`Geocode failed: ${status}`);
  //     }
  //   });
  // }

  // searchPlaces(options) {
  //   // searches for places given location, radius, and keyword query using Google Places text search API
  //   let service = new google.maps.places.PlacesService(this.map);

  //   service.textSearch(options, (results, status) => {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       this.clearMarkers();

  //       // create markers for each result found by Places API
  //       for (let i = 0; i < results.length; i++) {
  //         let place = results[i];
  //         this.createMarker(results[i]);
  //       }
  //     };
  //   });
  // }

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

  createMarker(obj) {
    const mark = new google.maps.Marker({
      position: obj.geometry.location,
      map: this.props.map,
      title: obj.name
    });
    this.setState({ markers: this.state.markers.concat([mark]) });

    const infoWindow = new google.maps.InfoWindow({
      content: `<img src=${obj.icon} />
                <h3>${obj.name}</h3>
                <h4>${obj.formatted_address}</h4>`
    });

    google.maps.event.addListener(mark, 'click', () => {
      this.clearInfoWindows();
      infoWindow.open(this.props.map, mark);
    });
    this.setState({ infoWindows: this.state.infoWindows.concat([infoWindow]) });
  }

  render() {
    return (
      <div id="gmap_canvas"></div>
    )
  }
}

MapCanvas.propTypes = {
  keyword: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  radius: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired
}

export default MapCanvas;