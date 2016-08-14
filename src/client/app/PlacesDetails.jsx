import React, { PropTypes } from 'react';

class PlacesDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    console.log(place)
    const placeName = typeof place.name !== undefined ? place.name : undefined;
    const placeAddress = typeof place.formatted_address !== undefined ? place.formatted_address : undefined;
    const placeRating = typeof place.rating !== undefined ? place.rating : 'Not Available';
    const placePhoto = typeof place.photos !== undefined ? place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}) : null;
    const placePhoneNumber = typeof place.formatted_phone_number !== undefined ? place.formatted_phone_number : 'Phone not available';
    const placePriceLevel = typeof place.price_level !== undefined ? new Array(place.price_level).join('$') : undefined;
    let openNow, weekdayText;
    if (place.opening_hours) {
      openNow = <p>{place.opening_hours.open_now ? 'Open now' : 'Closed now'}</p>
      if (place.opening_hours.weekday_text) {
        weekdayText = 
          (<ul>
            { 
              place.opening_hours.weekday_text.map( (hours, i) => <li key={i}>{hours}</li> )
            }
          </ul>);
      } 
    }

    return (
      <div>
        <span className="fake-link" onClick={this.props.returnToList}>Return to list</span>
        <p>{placeName}</p>
        <p>{placeAddress}</p>
        <p>{placePhoneNumber}</p>
        <p>{`Rating: ${placeRating}`}</p>
        <p>{placePriceLevel}</p>
        {openNow}
        {weekdayText}
        { place.website ? <a href={place.website}>{place.website}</a> : null }
        <img src={placePhoto} />
      </div>
    )  
  }
}

PlacesDetails.propTypes = {
  place: PropTypes.object.isRequired,
  returnToList: PropTypes.func.isRequired
}

export default PlacesDetails;