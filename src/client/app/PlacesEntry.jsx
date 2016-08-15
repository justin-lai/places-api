import React, { PropTypes } from 'react';

const PlacesEntry = (props) => {
  // verifies place content is available from Places API response
  const place = props.place;
  const placeName = place.name !== undefined ? place.name : null;
  const placeAddress = place.formatted_address !== undefined ? place.formatted_address : null;
  const placePhoto = Array.isArray(place.photos) ?
    place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }) : '../client/assets/noimage.jpg';
  const placeCombinedDetails = [];
  if (place.rating !== undefined) {
    const placeRating = `${place.rating} \u2605`;
    placeCombinedDetails.push(placeRating);
  }
  if (place.price_level !== undefined) {
    const placePriceLevel = new Array(place.price_level).join('$');
    placeCombinedDetails.push(placePriceLevel);
  }
  if (place.opening_hours) {
    const openNow = place.opening_hours.open_now ? 'Open now' : 'Closed';
    placeCombinedDetails.push(openNow);
  }

  return (
    <li className="places-entry row" onClick={() => { props.handleClickEntry(place); }} >
      <div className="entry-content-container col-xs-12 col-md-8">
        <p className="place-entry-name"><strong>{placeName}</strong></p>
        <p className="place-entry-details small">{placeCombinedDetails.join(' \xb7 ')}</p>
        <p className="place-entry-address small">{placeAddress}</p>
      </div>
      <div className="col-xs-12 col-md-4">
        <img alt={placeName} className="place-entry-photo" src={placePhoto} />
      </div>
    </li>
  );
};

PlacesEntry.propTypes = {
  place: PropTypes.object.isRequired,
  handleClickEntry: PropTypes.func.isRequired,
};

export default PlacesEntry;
