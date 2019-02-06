import React from 'react';
import Card from './Card';


class Board extends React.Component {

    constructor(props) {
        super(props);

        this.boardSize = props.size; //e.g.[4,4]
    }


    renderCard(imgId) {
        return <Card key={imgId} img={imgId}/>
    }

    renderBoard() {
        let board = [], total = 0;

        for (let i = 0; i < this.boardSize[1]; i++) {
            let rows = [];
            for (let j = 0; j < this.boardSize[0]; j++) {
                rows.push(this.renderCard(total));
                ++total;
            }
            rows.push(<br/>);
            board.push(rows);
        }

        return board;
    }

    render() {
        return (
            <div id="board">
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;
