import React, { PropTypes } from 'react';

class PlacesDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    console.log(place)
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
        <p>{place.name}</p>
        <p>{place.formatted_address}</p>
        <p>{place.formatted_phone_number || 'Phone not available'}</p>
        <p>{`Rating: ${place.rating}`}</p>
        <p>{ new Array(place.price_level).join('$') }</p>
        { openNow }
        { weekdayText }        
        <div>{ place.website ? <a href={place.website}>{place.website}</a> : null }</div>
        <img src={ place.photos ? place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}) : null } />
      </div>
    )  
  }
}

PlacesDetails.propTypes = {
  place: PropTypes.object.isRequired,
  returnToList: PropTypes.func.isRequired
}

export default PlacesDetails;