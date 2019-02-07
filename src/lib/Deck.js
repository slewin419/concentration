import shuffle from "fisher-yates-shuffle";

const IMAGES = ['bootstrap', 'css3', 'git', 'gulp', 'heroku', 'html5', 'javascript', 'jquery', 'linux',
    		'materialui','mysql', 'nodejs', 'npm', 'php', 'react', 'sass', 'stackoverflow','zend'];

export default class Deck {
    
    constructor() {
        this.deck = this.buildDeck();
    }
    
    /**
     * Build the deck in pairs and randomize the order
     * @returns {Array}
     */
    buildDeck(){
        let deck = [];
    	IMAGES.forEach((img,i) => {
    	    deck.push({id: `${img}-1`, img: img, flipped: false, matched: false});
	    deck.push({id: `${img}-2`, img: img, flipped: false, matched: false});
	});
    	return shuffle(deck);
    }
    
    /**
     * Update the flipped property of a card by id
     * @param id
     * @returns {Array|*}
     */
    flipCard(id){
    	let cardIndex = this.deck.findIndex(card => card.id === id);
    	this.deck[cardIndex].flipped = true;
    	return this.deck;
    }
    
    /**
     * Flip all the cards in the deck up or down
     * @param direction ['up'||'down']
     */
    flipAll(direction = 'down') {
        let flip = (direction === 'up') ? true : false;
    	this.deck.forEach((card,i,deck) => deck[i].flipped = flip);
    	return this.deck;
    }
    
    /**
     * Flag cards as matched by id
     * @param match
     * @returns {Array|*}
     */
    flagMatchedCards(match = []) {
    	this.deck.forEach((card,i,deck) => {
    	    if(card.id === match[0] || card.id === match[1]) {
    	        deck[i].matched = true;
	    }
	});
    	return this.deck;
    }
}