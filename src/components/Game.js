import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: null
        };
    }

    setCardState(size){
        if(size.length !== 2) return;

        let numCards = size[0] * size[1];

        this.setState({
            cards: Array(numCards).fill(null)
        });
    }

    resetGame(){
        this.setState({
            cards: null
        });
    }

    render() {
        let boardSize = this.props.boardSize;
        return (
            <Board size={boardSize} />
        )
    }
}

export default Game;
