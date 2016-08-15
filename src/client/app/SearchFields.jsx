import React from 'react';
// import { searchPlacesByText } from '../lib/placesAPI.jsx';

class SearchFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
    }
  }

  handleKeywordChange(e) { this.setState({ keyword: e.target.value })};
  handleAddressChange(e) { this.setState({ address: e.target.value })};
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleQuerySubmit({
      keyword: this.state.keyword,
      address: this.state.address,
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