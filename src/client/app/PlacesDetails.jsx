import React, { PropTypes } from 'react';

const PlacesDetails = (props) => {
  const place = props.place;
  const placeName = place.name !== undefined ? place.name : null;
  const placeAddress = place.formatted_address !== undefined ? place.formatted_address : null;
  const placePhoneNumber = place.formatted_phone_number !== undefined ?
    place.formatted_phone_number : 'Phone not available';
  const placePhoto = Array.isArray(place.photos) ?
    place.photos[0].getUrl({ maxWidth: 300, maxHeight: 150 }) : '../client/assets/noimage.jpg';
  const placeCombinedDetails = [];
  if (place.rating !== undefined) {
    const placeRating = `${place.rating} \u2605`;
    placeCombinedDetails.push(placeRating);
  }
  if (place.price_level !== undefined) {
    const placePriceLevel = new Array(place.price_level).join('$');
    placeCombinedDetails.push(placePriceLevel);
  }
  let openNow;
  let weekdayText;
  if (place.opening_hours) {
    openNow = <p className="small">{place.opening_hours.open_now ? 'Open now' : 'Closed now'}</p>;
    if (place.opening_hours.weekday_text) {
      weekdayText =
        (<ul className="weekday-hours-list">
          {
            place.opening_hours.weekday_text.map((hours, i) =>
              <li className="hours-entry small" key={i}>{hours}</li>)
          }
        </ul>);
    }
  }

  return (
    <div id="details-container">
      <a
        className="return-link"
        href="#"
        onClick={props.returnToList}
      >
        Return to list &#8617;
      </a>
      <img className="details-photo" src={placePhoto} alt={placeName} />
      <h2 className="place-details-name"><strong>{placeName}</strong></h2>
      { place.website ?
        <a className="place-details-website small" href={place.website}>{place.website}</a> : null }
      <p className="place-details-address small">{placeAddress}</p>
      <p className="place-details-phone small">{placePhoneNumber}</p>
      <p className="place-details-combined small">{placeCombinedDetails.join(' \xb7 ')}</p>
      {openNow}
      {weekdayText}
    </div>
  );
};

PlacesDetails.propTypes = {
  place: PropTypes.object.isRequired,
  returnToList: PropTypes.func.isRequired,
};

export default PlacesDetails;
