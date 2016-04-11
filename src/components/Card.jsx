import React from 'react';
import CardActions from '../actions/Card';
import {DragSource, DropTarget} from 'react-dnd';

/* Card to card drag source */
var cardSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
}

/* Card to card drop target */
var cardTarget = {
  drop(targetProps, monitor) {
    var sourceProps = monitor.getItem();
    var targetId = targetProps.id;
    var sourceId = sourceProps.id;
    targetProps.handleCardMove({sourceId, targetId});
  }
}

@DragSource('Card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget('Card', cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class CardComponent extends React.Component {
  name = ''
  handleChange = (event) => {
    var name = event.target.value;
    CardActions.update({cardId: this.props.id, updates: {name}});
  }
  render() {
    return this.props.connectDropTarget(this.props.connectDragSource(
      <div className="card">
        <input type="text" placeholder="Text" className="card-title"
          value={this.props.name} autoFocus onChange={this.handleChange} />
      </div>
    ));
  }
}

export default CardComponent


