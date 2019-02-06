import React from 'react';
import Card from './Card';
import shuffle from 'fisher-yates-shuffle';

const SKILL_IMGS = ['bootstrap', 'css3', 'git', 'gulp', 'heroku', 'html5', 'javascript', 'jquery', 'linux',
                    'materialui','mysql', 'nodejs', 'npm', 'php', 'react', 'sass', 'stackoverflow','zend'];


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

    renderCard(key,img) {
        return <Card key={key} img={img}/>
    }

    renderBoard() {
        let board = [], total = 0,
            size = this.state.size,
            numCards = size[0] * size[1],
            skills = SKILL_IMGS.slice(0);

        for (let i = 0; i < (numCards/2); i++) {
            board.push(this.renderCard(Estf));
	    board.push(this.renderCard());
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
