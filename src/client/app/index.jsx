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
  render () {
    return (
      <div>
        <h1>Find places!</h1>
        <SearchFields />
        <MapCanvas />
      </div>

    );
  }
}

render(<App/>, document.getElementById('app'));