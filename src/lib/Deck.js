import shuffle from "fisher-yates-shuffle";

const IMAGES = ['bootstrap', 'css3', 'git', 'gulp', 'heroku', 'html5', 'javascript', 'jquery', 'linux',
    'materialui', 'mysql', 'nodejs', 'npm', 'php', 'react', 'sass', 'stackoverflow', 'zend'];

export default class Deck {

    constructor() {
        this.deck = this.buildDeck();
    }

    /**
     * Build the deck in pairs and randomize the order
     * @returns {Array}
     */
    buildDeck() {
        let deck = [];
        IMAGES.forEach((img, i) => {
            deck.push({id: `${img}-1`, img: img, flipped: false, matched: false});
            deck.push({id: `${img}-2`, img: img, flipped: false, matched: false});
        });
        return shuffle(deck);
    }
}

/**
 * Update the flipped property of a card by id
 * @param deck
 * @param id
 * @param direction
 * @returns {Array|*}
 */
var flipCard = (deck = [],id, direction = 'up') => {
    let flip = (direction === 'up') ? true : false;
    let cardIndex = deck.findIndex(card => card.id === id);

    if(cardIndex !== -1){
        deck[cardIndex].flipped = flip;
    }

    return deck;
}

/**
 * Flip all the cards in the deck up or down
 * @param direction ['up'||'down']
 */
var flipAll = (deck = [], direction = 'down') => {
    let flip = (direction === 'up') ? true : false;
    deck.forEach((card, i, deck) => deck[i].flipped = flip);
    return deck;
}

/**
 * Flag cards as matched by id
 * @param match
 * @returns {Array|*}
 */
var makePair = (deck = [], match = []) => {
    deck.forEach((card, i, deck) => {
        if (card.id === match[0] || card.id === match[1]) {
            deck[i].matched = true;
        }
    });
    return deck;
}

/**
 *
 * @param card1
 * @param card2
 * @returns {boolean}
 */
var isPair = (card1 = '',card2 = '') => {
    debugger;
    var re = /(\w*)-\d{1,2}/;
    return re.exec(card1)[1] === re.exec(card2)[1];
}

export {flipCard, flipAll, makePair, isPair};



