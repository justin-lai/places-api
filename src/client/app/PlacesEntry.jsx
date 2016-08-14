import React, { PropTypes } from 'react';

class PlacesEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    return (
      <li className="places-entry" onClick={()=>{ this.props.handleClickEntry(place) }} >
        <div>
          <p>{place.name}</p>
          <p>{place.address}</p>
          <p>{place.rating}</p>
          <p>{place.formatted_address}</p>
          <p>{ new Array(place.price_level).join('$') }</p>
          <img src={place.photos ? place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}) : null } />
        </div>
      </li>
    )  
  }
}

PlacesEntry.propTypes = {
  place: PropTypes.object.isRequired,
  handleClickEntry: PropTypes.func.isRequired
}

export default PlacesEntry;