import React from 'react';
// import { searchPlacesByText } from '../lib/placesAPI.jsx';

class SearchFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
      radius: '500'
    }
  }

  handleKeywordChange(e) { this.setState({ keyword: e.target.value })};
  handleAddressChange(e) { this.setState({ address: e.target.value })};
  handleRadiusChange(e) { this.setState( {radius: e.target.value })}
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleQuerySubmit({
      keyword: this.state.keyword,
      address: this.state.address,
      radius: this.state.radius
    });
  }

  render() {
    return (
      <div id="search-fields">
        <form className="gmap_form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group input-group-sm">
            <span className="input-group-addon" id="location-addon">Currently in</span>
            <input id="gmap_where" className="form-control" type="text" name="gmap_where" onChange={this.handleAddressChange.bind(this)} placeholder="San Francisco, CA"/>
          </div>
          <div className="input-group input-group-sm">
            <span className="input-group-addon" id="keyword-addon">Looking for</span>
            <input id="gmap_keyword" className="form-control" type="text" name="gmap_keyword" onChange={this.handleKeywordChange.bind(this)} placeholder="Restaurants, Schools, ATMs, ..." />
          </div>

          <div className="button">
            <label htmlFor="gmap_radius">Radius:</label>
            <select id="gmap_radius" onChange={this.handleRadiusChange.bind(this)} >
              <option value="500" defaultValue>500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="5000">5000</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg search-button">
              <span className="glyphicon glyphicon-search large"></span> Search
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchFields;