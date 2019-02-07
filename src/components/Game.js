import React from 'react';
import Board from './Board';
import Timer from "./Timer";



const DECK = ['bootstrap', 'css3', 'git', 'gulp', 'heroku', 'html5', 'javascript', 'jquery', 'linux',
    'materialui','mysql', 'nodejs', 'npm', 'php', 'react', 'sass', 'stackoverflow','zend'];

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: "44",
            seconds: 0
        };

        //this.setCards();
    }

    handleClick(e){
        console.log('Game:click');
    }

    newGame(e){
        e.preventDefault();

        let boardSize = this.refs.boardSize.value;
        this.setState({
            boardSize: boardSize,
            cards: null
        });
    }

    resetGame(){
        this.setState({
            cards: null
        });
    }

    render() {
        let {boardSize, seconds} = this.state;
        return (
            <div className="row">
                <div className="col-sm-9">
                    <Board size={boardSize} deck={DECK} onClick={this.handleClick}/>
                </div>
                <div id="status" className="col-sm-3">
                    <hr/>
                    <div className="well well-lg text-center">
                        <Timer time={seconds} />
                    </div>
                    <table className="table table-bordered table-striped table-condensed">
                        <tbody>
                        <tr>
                            <td>Turns:</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Correct:</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Accuracy:</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td>00:h:00m:00s</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-lg btn-danger btn-block">Reset</button>
                    <hr/>
                    <form className="form">
                        <div className="form-group">
                            <label>Board Size: </label>
                            <select
                                id="board-size"
                                ref="boardSize"
                                className="form-control"
                            >
                                <option value="44">4x4</option>
                                <option value="45">4x5</option>
                                <option value="46">4x6</option>
                                <option value="54">5x4</option>
                                <option value="56">5x6</option>
                                <option value="64">6x4</option>
                                <option value="65">6x5</option>
                                <option value="66">6x6</option>
                            </select>
                        </div>
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            onClick={(e) => this.newGame(e)}>
                            New Game
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Game;
