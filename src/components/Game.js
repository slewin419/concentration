import React from 'react';
import Board from './Board';
import Timer from "./Timer";
import Deck, {flipCard, makePair, isPair} from "../lib/Deck";

class Game extends React.Component {

    constructor(props) {
        super(props);

        this._Deck = new Deck();

        this.state = {
            seconds: 0,
            deck: this._Deck.deck,
            pendingMatch: [],
        };

        //Use this flag to prevent clicking card while flipping down
        this.preventClick = false;
    }

    handleClick(e) {
        if (this.preventClick || (e.target.id === "board")) return;

        let {pendingMatch, deck} = this.state;

        if(pendingMatch.length === 2) return;

        if (!pendingMatch.length) {
            let cardId = e.target.id;

            this.setState({
                deck: flipCard(deck, cardId),
                pendingMatch: [cardId]
            });
        } else {
            let cardId = e.target.id;

            this.setState({
                deck: flipCard(deck, cardId),
                pendingMatch: [pendingMatch[0], cardId]
            });
        }
    }    

    newGame(e) {
        e.preventDefault();
    }

    resetGame() {
        this.setState({
            cards: null
        });
    }

    componentDidMount() {
        this.setState({
            //deck: new Deck()
        });
    }

    componentDidUpdate() {
        let {pendingMatch, deck} = this.state;

        let card1 = pendingMatch[0], card2 = pendingMatch[1];

        //No cards picked
        if (!card1 && !card2) {
            return false;
        }

        //Bad pair picked
        if (card1 && card2) {
            if (!isPair(card1,card2)) {

                setTimeout(() => {
                    this.setState({
                        pendingMatch: [],
                        deck: flipCard(flipCard(deck, card1, 'down'), card2, 'down')
                    });
                }, 1000);

            } else {                

                setTimeout(() => {
                    this.setState({
                        pendingMatch:[],
                        deck: makePair(deck, pendingMatch)
                    });
                }, 1000);
            }
        }
    }


    render() {
        let {seconds, deck} = this.state;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-9">
                    <h1 className="text-center">Concentration</h1>
                    <Board deck={deck} onClick={(e) => this.handleClick(e)}/>
                </div>
                <div className="col-xs-10 col-xs-offset-1 col-sm-2 col-sm-offset-0">
                    <hr/>
                    <div className="well well-lg text-center">
                        <Timer time={seconds}/>
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
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(e) => this.newGame(e)}>
                        New Game
                    </button>
                </div>
            </div>
        )
    }
}

export default Game;
