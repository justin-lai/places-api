import React from 'react';

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let san_francisco = new google.maps.LatLng(37.773972, -122.431297);

    this.map = new google.maps.Map(document.getElementById('gmap_canvas'), {
      center: san_francisco,
      zoom: 15
    });

    const request = {
      location: san_francisco,
      radius: '500',
      query: 'restaurant'
    };

    let callback = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          console.log('PLACE: ', place);
          this.createMarker(results[i]);
        }
      }
    }
    
    // let service = new google.maps.places.PlacesService(this.map);
    // service.textSearch(request, callback.bind(this));
  }

  createMarker(obj) {
    // prepare new Marker object
        const mark = new google.maps.Marker({
            position: obj.geometry.location,
            map: this.map,
            title: obj.name
        });
        // markers.push(mark);

        // prepare info window
        const infowindow = new google.maps.InfoWindow({
            content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name + 
            '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
        });

        // add event handler to current marker
        google.maps.event.addListener(mark, 'click', function() {
        //     clearInfos();
            infowindow.open(this.map, mark);
        });
        // infos.push(infowindow);
  }

  render() {
    return (
      <div id="gmap_canvas"></div>
    )
  }
}

export default MapCanvas;