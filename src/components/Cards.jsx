import React from 'react';
import Card from './Card';


class CardsComponent extends React.Component {
  render() {
    var cards = this.props.cards.map((card) => {
      return <Card name={card.name} key={card.id} id={card.id}
        handleCardMove={this.props.handleCardMove}/>;
    });
    return <div id="cards">{cards}</div>;
  }
}

export default CardsComponent;
