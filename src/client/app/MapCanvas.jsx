import React from 'react';

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      infoWindows: [],
    };
  }

  componentDidMount() {
    let san_francisco = new google.maps.LatLng(37.773972, -122.431297);

    this.map = new google.maps.Map(document.getElementById('gmap_canvas'), {
      center: san_francisco,
      zoom: 15
    });

    const options = {
      location: san_francisco,
      radius: this.props.radius || '500',
      query: this.props.keyword || 'restaurant'
    };

    this.searchMap(options);
  }

  componentWillReceiveProps(nextProps) {
    let san_francisco = new google.maps.LatLng(37.773972, -122.431297);

    const options = {
      location: san_francisco,
      radius: nextProps.radius,
      query: nextProps.keyword
    };

    this.searchMap(options);
  }

  searchMap(options) {
    let callback = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.clearMarkers();
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          this.createMarker(results[i]);
          console.log('Place: ', place);
        }
      }
    }
    
    let service = new google.maps.places.PlacesService(this.map);
    service.textSearch(options, callback.bind(this));
  }

  clearMarkers() {
    console.log('CLEARING MARKERS');
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
      map: this.map,
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
      infoWindow.open(this.map, mark);
    });
    this.setState({ infoWindows: this.state.infoWindows.concat([infoWindow]) });
  }

  render() {
    return (
      <div id="gmap_canvas"></div>
    )
  }
}

export default MapCanvas;