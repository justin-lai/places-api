import React, { PropTypes } from 'react';

class PlacesEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    console.log(place);
    const placeName = typeof place.name !== undefined ? place.name : undefined;
    const placeRating = typeof place.rating !== undefined ? new Array(place.price_level).join('$') : undefined;
    const placeAddress = typeof place.formatted_address !== undefined ? place.formatted_address : undefined;
    const placePhoto = Array.isArray(place.photos) ? place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}) : null;

    return (
      <li className="places-entry" onClick={()=>{ this.props.handleClickEntry(place) }} >
        <div>
          <p>{placeName}</p>
          <p>{placeRating}</p>
          <p>{placeAddress}</p>
          <img src={placePhoto} />
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