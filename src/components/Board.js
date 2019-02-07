import React from 'react';
import Card from './Card';

import shuffle from 'fisher-yates-shuffle';

class Board extends React.Component {

    /**
     *
     * @param props {size,cards}
     */
    constructor(props) {
        super(props);

        this.state = {
            size: "44",
            deck: this.shuffleDeck()
        };

        this.boardClassName = `w${props.size[0]}y${props.size[1]}`;
    }

    boardStyle(){
        return {};
    }

    shuffleDeck() {
        let {deck,size} = this.props;
        let numCards = size[0]*size[1];

        deck = shuffle(deck).slice(0, numCards/2);
        return deck;
    }


    renderCard(key,img) {
        return <Card key={key} img={img}/>
    }

    renderBoard() {
        let cards = [];

        this.state.deck.forEach((card,i) => {
            cards.push(this.renderCard(`${card}-${++i}`, card));
            cards.push(this.renderCard(`${card}-${++i}`, card));
        });

        return shuffle(cards);
    }

    render() {
        console.log('board:render');
        return (
            <div id="board" className={this.boardClassName} style={this.boardStyle()}>
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;
