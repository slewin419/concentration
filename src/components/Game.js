import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Board size={[4,6]}/>
        )
    }
}

export default Game;
