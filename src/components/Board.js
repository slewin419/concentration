import React from 'react';
import Card from './Card';

//import shuffle from 'fisher-yates-shuffle';

class Board extends React.Component {

    /**
     *
     * @param props {size,cards}
     */
    constructor(props) {
        super(props);

        this.state = {
            size: "44",
        };
    }

    boardStyle(){
        return {};
    }

    renderCard(key,img, flipped) {
        return <Card key={key} id={key} img={img} flipped={flipped}/>
    }

    renderBoard() {
        let cards = [];

        this.props.deck.forEach((card,i) => {
            cards.push(this.renderCard(card.id,card.img,card.flipped));
        });

        return cards;
    }

    render() {
        //console.log('board:render');
        return (
            <div id="board"
                 className={this.boardClassName}
                 style={this.boardStyle()}
                 onClick={this.props.onClick}>
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;
