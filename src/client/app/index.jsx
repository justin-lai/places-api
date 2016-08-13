import React from 'react';
import {render} from 'react-dom';
import SearchFields from './SearchFields.jsx';
import MapCanvas from './MapCanvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      address: '',
      radius: '500'
    }; 
  }

  handleQuerySubmit(params) {
    console.log(params);
    this.setState({
      keyword: params.keyword,
      address: params.address,
      radius: params.radius
    });
  }

  render () {
    return (
      <div>
        <h1>Find places!</h1>
        <SearchFields handleQuerySubmit={this.handleQuerySubmit.bind(this)} />
        <MapCanvas
          keyword={this.state.keyword}
          address={this.state.address}
          radius={this.state.radius}
        />
      </div>

    );
  }
}

render(<App/>, document.getElementById('app'));