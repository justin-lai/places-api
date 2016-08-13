import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="actions">
          <div className="button">
              <label htmlFor="gmap_where">Where:</label>
              <input id="gmap_where" type="text" name="gmap_where" /></div>
          <div id="button2" className="button" onclick="findAddress(); return false;">Search for address</div>
          <div className="button">
              <label htmlFor="gmap_keyword">Keyword (optional):</label>
              <input id="gmap_keyword" type="text" name="gmap_keyword" /></div>
          <div className="button">
              <label htmlFor="gmap_type">Type:</label>
              <select id="gmap_type">
                  <option value="art_gallery">art_gallery</option>
                  <option value="atm">atm</option>
                  <option value="bank">bank</option>
                  <option value="bar">bar</option>
                  <option value="cafe">cafe</option>
                  <option value="food">food</option>
                  <option value="hospital">hospital</option>
                  <option value="police">police</option>
                  <option value="store">store</option>
              </select>
          </div>
          <div className="button">
              <label htmlFor="gmap_radius">Radius:</label>
              <select id="gmap_radius">
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="1500">1500</option>
                  <option value="5000">5000</option>
              </select>
          </div>
          <input type="hidden" id="lat" name="lat" value="40.7143528" />
          <input type="hidden" id="lng" name="lng" value="-74.0059731" />
          <div id="button1" className="button" onClick="findPlaces(); return false;">Search for objects</div>
      </div>
    )
  }
}

export default Main;