import React from 'react';
import Board from './Board';
import Timer from "./Timer";
import Deck, {flipCard, flipAll, makePair, isPair} from "../lib/Deck";

class Game extends React.Component {

    constructor(props) {
        super(props);

        this._Deck = new Deck();

        this.state = {
            seconds: 0,
            deck: this._Deck.deck,
            pendingMatch: ['', '']
        };

        //Use this flag to prevent clicking card while flipping down
        this.preventClick = false;
    }

    handleClick(e) {
        if (this.preventClick) return;

        let {pendingMatch, deck} = this.state;

        if (pendingMatch[0] === '') {
            let cardId = e.target.id;

            this.setState({
                deck: flipCard(deck, cardId),
                pendingMatch: [cardId, '']
            });
        } else {
            let cardId = e.target.id;

            this.setState({
                deck: flipCard(deck, cardId),
                pendingMatch: [pendingMatch[0], cardId]
            });
        }
    }

    /**
     * Update the deck state array to flip the selected card
     */
    /*flipCard(deck, cardId) {
        if(!deck.length) return;

        let pendingIndex = deck.findIndex(card => card.id === cardId);

        if(pendingIndex !== -1) {
            deck[pendingIndex].flipped = true;
        }

        let flippedCard = deck[pendingIndex];

        return {
            deck: deck,
            pendingId: flippedCard && flippedCard['img'] || null
        };
    }*/

    /**
     * Flip cards down when mismatched cards picked
     * @param deck
     */
    /*flipDownCards(deck){
        let newDeck = deck.map((card,i) => {
            if(card.flipped){
                deck[i].flipped = false;
            }
            return card;
        });

        return newDeck;
    }*/

    /**
     * Mark cards as matched in the deck
     */
    /*matchCards(deck){
        let newDeck = deck.map((card,i) => {
            if(card.flipped){
                deck[i].flipped = "matched";
            }
            return card;
        });

        return newDeck;
    }*/

    /**
     * Randomize the cards
     */

    /*shuffleDeck() {
        console.log('Game:shuffleDeck', this.state.deck);
        let {boardSize, deck} = this.state;

        deck.slice(0, deck.length).forEach((card, i) => {
            deck.push({"id":`${card}_${++i}`, "img": card, "flipped": false});
            deck.push({"id":`${card}_${++i}`, "img": card, "flipped": false});
        });

        return deck;
    }*/

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
            console.log('no cards picked');
            return false;
        }

        //Bad pair picked
        if (card1 && card2) {
            if (!isPair(card1,card2)) {
                console.log('bad pair');
                this.preventClick = true;
                setTimeout(() => {
                    this.setState({
                        pendingMatch: ['', ''],
                        deck: flipCard(flipCard(deck, card1, 'down'), card2, 'down')
                    });
                    this.preventClick = false;
                }, 1000);

            } else {
                console.log('pair!');
                isPair(card1,card2);

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
