import React from 'react';
import AltContainer from 'alt-container';
import {DropTarget} from 'react-dnd';
import Cards from './Cards';
import ListActions from '../actions/List';
import CardActions from '../actions/Card';
import CardStore from '../stores/Card';

/* Card to list drop target */
var listTarget = {
  drop(targetProps, monitor) {
    var sourceProps = monitor.getItem();
    var listId = targetProps.list.id;
    var cardId = sourceProps.id;
    targetProps.moveToList({cardId, listId});
  }
}

@DropTarget('Card', listTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class ListComponent extends React.Component {

  handleChangeName = (event) => {
    ListActions.update({
      listId: this.props.list.id,
      updates: {name: event.target.value}
    });
  }
  handleCreateCard = (event) => {
    event.stopPropagation();
    const listId = this.props.list.id;
    CardActions.create({card: {name: ''}, listId: listId});
  }
  handleCardMove = ({sourceId, targetId}) => {
    CardActions.move({sourceId, targetId});
  }
  render() {
    return this.props.connectDropTarget(
      <div className="list-wrapper">
        <div className="list">
          <input onChange={this.handleChangeName} type="text" placeholder="List title"
            className="list-title" value={this.props.list.name} autoFocus />
            <AltContainer
              stores={[CardStore]}
              inject={{
                cards: () => CardStore.getCardsForList({listId: this.props.list.id}) || []
              }}>
              <Cards handleCardMove={this.handleCardMove}/>
            </AltContainer>
          <input type="button" value="Add card" className="add-card" onClick={this.handleCreateCard} />
        </div>
      </div>
    );
  }
}

export default ListComponent;


