import React from 'react';
import ListsComponent from './Lists';
import ListActions from '../actions/List';
import ListStore from '../stores/List';
import AltContainer from 'alt-container';

class BoardComponent extends React.Component {

  createList = () => {
    ListActions.create({name: ''});
  }
  render() {
    return (
      <div id="board">
        <h1>{this.name}</h1>
        <AltContainer
          stores={[ListStore]}
          inject={{
            lists: () => ListStore.getState().lists || []
          }}
        >
          <ListsComponent createList={this.createList}/>
        </AltContainer>
      </div>
    );
  }
}

export default BoardComponent;


