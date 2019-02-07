import React from 'react';
import Board from './Board';
import Timer from "./Timer";
import shuffle from "fisher-yates-shuffle";



const DECK = ['bootstrap', 'css3', 'git', 'gulp', 'heroku', 'html5', 'javascript', 'jquery', 'linux',
    'materialui','mysql', 'nodejs', 'npm', 'php', 'react', 'sass', 'stackoverflow','zend'];

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boardSize: "44",
            seconds: 0,
            deck: [],
            pendingCard: false, //First card picked?
            matchCard: false //Second card picked?
        };

        //Use this flag to prevent clicking card while flipping down
        this.preventClick = false;
    }

    handleClick(e){
        if(this.preventClick) return;

        let {pendingCard} = this.state, pending = null;

        if(!pendingCard) {
            pending = e.target.id;
            this.setState(oldState => {
               let {deck, pendingId} = this.flipCard(oldState.deck, pending);
               return {
                   deck: deck,
                   pendingCard: pendingId
               }
            });
        } else {
            let target = e.target, matchId = target.id;
            this.setState(oldState => {
                let {deck} = this.flipCard(oldState.deck, matchId);
                return {
                    deck: deck,
                    matchCard: target.dataset.match
                }
            });
        }
    }

    /**
     * Update the deck state array to flip the selected card
     */
    flipCard(deck, cardId) {
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
    }

    /**
     * Flip cards down when mismatched cards picked
     * @param deck
     */
    flipDownCards(deck){
        let newDeck = deck.map((card,i) => {
            if(card.flipped){
                deck[i].flipped = false;
            }
            return card;
        });

        return newDeck;
    }

    /**
     * Mark cards as matched in the deck
     */
    matchCards(deck){
        let newDeck = deck.map((card,i) => {
            if(card.flipped){
                deck[i].flipped = "matched";
            }
            return card;
        });

        return newDeck;
    }

    /**
     * Randomize the cards
     */
    shuffleDeck() {
        console.log('Game:shuffleDeck');
        let {boardSize} = this.state, deck = [];
        let numCards = boardSize[0] * boardSize[1];

        shuffle(DECK).slice(0, numCards/2).forEach((card, i) => {
            deck.push({"id":`${card}_${++i}`, "img": card, "flipped": false});
            deck.push({"id":`${card}_${++i}`, "img": card, "flipped": false});
        });

        return shuffle(deck);
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

    componentDidMount(){
        this.setState({
            deck: this.shuffleDeck()
        });
    }

    componentDidUpdate(){
        let {matchCard, pendingCard, deck} = this.state;

        //No cards picked
        if(!matchCard && !pendingCard){
            //console.log('dont update');
            return false;
        }

        //Bad pair picked
        if(!!matchCard && (matchCard !== pendingCard)){
            this.preventClick = true;
            setTimeout(() => {
                this.setState({
                    matchCard: false,
                    pendingCard: false,
                    deck: this.flipDownCards(deck)
                }, () => {
                    this.preventClick = false;
                });
            }, 1000);
        }

        //Pair is picked
        if(matchCard === pendingCard) {
            this.preventClick = true;
            console.log('good pair');
            setTimeout(() => {
                this.setState({
                    matchCard: false,
                    pendingCard: false,
                    deck: this.matchCards(deck)
                }, () => {
                    this.preventClick = false;
                });
            }, 1000);
        }
    }

    render() {
        let {boardSize, seconds,deck} = this.state;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-9">
                    <Board size={boardSize} deck={deck} onClick={(e) => this.handleClick(e)}/>
                </div>
                <div className="col-xs-12 col-sm-3">
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
