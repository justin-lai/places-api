import React from 'react';
import {render} from 'react-dom';
import Main from './main.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <div id="gmap_canvas"></div>
        <p>This is index.js</p>
        <Main />
      </div>

    );
  }
}

render(<App/>, document.getElementById('app'));