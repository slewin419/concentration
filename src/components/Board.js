import React from 'react';
import Card from './Card';


class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            size: "44"
        };
    }

    componentWillReceiveProps(props){
        this.setState({size: props.size});
    }

    renderCard(imgId) {
        return <Card key={imgId} img={imgId}/>
    }

    renderBoard() {
        let board = [], total = 0, size = this.state.size;

        for (let i = 0; i < size[1]; i++) {
            let rows = [];
            for (let j = 0; j < size[0]; j++) {
                rows.push(this.renderCard(total));
                ++total;
            }
            rows.push(<br key={++total}/>);
            board.push(rows);
        }

        return board;
    }

    render() {
        console.log('board:render');
        return (
            <div id="board">
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;
