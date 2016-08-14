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
          <div className="button">
              <label htmlFor="gmap_keyword">Keyword (optional):</label>
              <input id="gmap_keyword" type="text" name="gmap_keyword" onChange={this.handleKeywordChange.bind(this)} />
          </div>
          <div className="button">
            <label htmlFor="gmap_where">Near:</label>
            <input id="gmap_where" type="text" name="gmap_where" onChange={this.handleAddressChange.bind(this)} />
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
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}

export default SearchFields;