import React from 'react';
import ListComponent from './List';
import CardActions from '../actions/Card';


class ListsComponent extends React.Component {
  moveToList({cardId, listId}) {
    CardActions.moveToList({cardId, listId});
  }
  render() {
    return (
      <div id="lists">
        {this.props.lists.map((list, index) => {
          return <ListComponent list={list} key={index} moveToList={this.moveToList} />;
        })}
        <div className="list-wrapper add-list-wrapper">
          <div className="list">
            <input type="button" value="Add list" onClick={this.props.createList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListsComponent;
