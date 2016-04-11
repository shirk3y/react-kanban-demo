import uuid from 'node-uuid';
import alt from '../Alt';
import ListActions from '../actions/List';

class ListStore {

  lists = [];

  constructor() {
    this.bindActions(ListActions);
  }

  create(list) {
    const lists = this.lists; // prevent mutation
    list.id = uuid.v4();
    this.setState({
      lists: lists.concat(list)
    });
  }

  update({listId, updates}) {
    var list = this.getListById({listId});
    if(list) {
      Object.assign(list, updates);
      this.setState({lists: this.lists});
    }
  }

  getListById({listId}) {
    for(var list of this.lists) {
      if(list.id == listId) {
        return list;
      }
    }
  }
}

export default alt.createStore(ListStore, 'ListStore');
