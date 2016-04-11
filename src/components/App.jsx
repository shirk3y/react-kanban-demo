require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './Board';


@DragDropContext(HTML5Backend)
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Board />
      </div>
    );
  }
}

export default AppComponent;
