import React, { PropTypes } from 'react';
import PlacesEntry from './PlacesEntry.jsx'

const PlacesList = ({ places, handleClickEntry }) => (
  <ul id="places-list">
    {
      places.map(place => <PlacesEntry place={place} key={place.id} handleClickEntry={handleClickEntry} />)
    }
  </ul>
);

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  handleClickEntry: PropTypes.func.isRequired
}

export default PlacesList;