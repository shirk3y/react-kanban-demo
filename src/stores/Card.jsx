import uuid from 'node-uuid';
import alt from '../Alt';
import CardActions from '../actions/Card';

class CardStore {

  cards = [];

  constructor() {
    this.bindActions(CardActions);
    this.exportPublicMethods({
      getCardsForList: this.getCardsForList.bind(this)
    });
  }

  create({card, listId}) {
    const cards = this.cards; // prevent mutation
    card.id = uuid.v4();
    card.listId = listId;
    this.setState({
      cards: cards.concat(card)
    });
  }

  update({cardId, updates}) {
    var card = this.getCardById({cardId});
    if(card) {
      Object.assign(card, updates);
      this.setState({cards: this.cards});
    }
  }

  move({sourceId, targetId}) {
    //TODO: There may be simpler way to achieve it
    var sourceIdx = this.getCardIndexById({cardId: sourceId});
    var targetIdx = this.getCardIndexById({cardId: targetId});
    [this.cards[sourceIdx].name, this.cards[targetIdx].name] =
      [this.cards[targetIdx].name, this.cards[sourceIdx].name];
    this.setState({cards: this.cards});
  }

  moveToList({cardId, listId}) {
    var card = this.getCardById({cardId});
    if(card) {
      card.listId = listId;
      this.setState({cards: this.cards});
    }
  }

  getCardIndexById({cardId}) {
    for(var i=0; i<this.cards.length; i++) {
      if(this.cards[i].id == cardId) {
        return i;
      }
    }
    return null;
  }

  getCardById({cardId}) {
    var index = this.getCardIndexById({cardId});
    if(index !== null) {
      return this.cards[index];
    }
  }

  getCardsForList({listId}) {
    return this.cards.filter((card) => {
      return card.listId == listId;
    });
  }
}

export default alt.createStore(CardStore, 'CardStore');
