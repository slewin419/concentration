import React from 'react';
import Board from './Board';
import Timer from "./Timer";

import Deck, {flipCard, makePair, isPair, isGameOver} from "../lib/Deck";

const TURN_DELAY = 800;

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.deck = new Deck();
        this.timerInterval = null;
        this.preventClick = true;

        this.state = {
            deck: this.deck,
            pendingMatch: [],
            gameStarted: false,
            gameComplete: false,
            time: 0 //in seconds
        };
    }

    startTimer(){
        this.timerInterval = setInterval(() => {
            this.setState((prevState) => {
                return {
                    time: ++prevState.time
                };
            });
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.timerInterval);
    }

    handlePendingMatch(state) {
        this.preventClick = true;
        setTimeout(() => {
            this.setState({
                pendingMatch: [],
                ...state
            }, () => {
                this.preventClick = false;

                if(isGameOver(this.state.deck)){
                    this.setState({
                        gameComplete: true
                    });
                }
            });
        }, TURN_DELAY);
    }

    handleCardPicked(card1,card2,deck, pendingMatch) {
        if (card1 && card2) {
            if (!isPair(card1,card2)) {
                this.handlePendingMatch({
                    deck: flipCard(flipCard(deck, card1, 'down'), card2, 'down')
                });
            } else {
                this.handlePendingMatch({
                    deck: makePair(deck, pendingMatch)
                });
            }
        }
    }

    handleClick(e) {
        let {pendingMatch, deck, gameStarted} = this.state;

        if (!/(\w*)-\d{1,2}/.test(e.target.id)
            || pendingMatch.length === 2)
            return;

        if(!gameStarted){
            //this.startTimer();
            this.setState({
                gameStarted: true
            });
        }

        if (!pendingMatch.length) {
            let cardId = e.target.id;

            this.setState({
                gameStarted: true,
                deck: flipCard(deck, cardId),
                pendingMatch: [cardId]
            }, () => {
                let {pendingMatch, deck} = this.state;
                this.handleCardPicked(pendingMatch[0], pendingMatch[1], deck, pendingMatch);
            });
        } else {
            let cardId = e.target.id;

            this.setState({
                deck: flipCard(deck, cardId),
                pendingMatch: [pendingMatch[0], cardId]
            }, () => {
                let {pendingMatch, deck} = this.state;
                this.handleCardPicked(pendingMatch[0], pendingMatch[1], deck, pendingMatch);
            });
        }
    }

    newGame(e) {
        let newDeck = new Deck();
        this.setState({
            gameStarted: false,
            gameComplete: false,
            pendingMatch: [],
            deck: newDeck,
            time: 0
        }, () => {
            //this.stopTimer();
        });
    }

    render() {
        let {time, deck, gameComplete} = this.state;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-9">
                    <h1 className="text-center">Concentration</h1>
                    <Board deck={deck} onClick={(e) => this.handleClick(e)}/>
                    <h1 className="text-center">{gameComplete ? 'You Won!' : ''}</h1>
                </div>
                <div className="col-xs-10 col-xs-offset-1 col-sm-2 col-sm-offset-0">
                    <div className="well well-lg text-center hidden">
                        <Timer time={time}/>
                    </div>
                    <table className="table table-bordered table-striped table-condensed hidden">
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
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(e) => this.newGame(e)}>
                        New Game
                    </button>
                </div>
                <div className="col-xs-12">
                    <h1 className="well text-center">Scoreboard coming soon!</h1>
                </div>
            </div>
        )
    }
}

export default Game;
