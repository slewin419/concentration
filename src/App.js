import React from 'react';
import Game from './components/Game';
import Timer from './components/Timer';
import './App.scss';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            boardSize: "44",
            cards: []
        };
    }

    newGame(e){
        e.preventDefault();

        let boardSize = this.refs.boardSize.value;
        this.setState({
            boardSize: boardSize,
            cards: []
        });
    }

    render() {
        return (
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-9">
                            <Game boardSize={this.state.boardSize}/>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <div id="status" className="row">
                                <hr/>
                                <div className="well well-lg text-center">
                                    {/*<span id="timer">Timer: 00:00:00</span>*/}
                                    <Timer />
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
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
