import Deck from '../lib/Deck';

const NEW_DECK 		= 'NEW_DECK';
const FLIP_CARD 	= 'FLIP_CARD';
const FLIP_ALL 		= 'FLIP_ALL';
const FLIP_CARD_UP 	= 'UP';
const FLIP_CARD_DOWN 	= 'DOWN';

//Action creators
export function newDeck(){
    return {
        type: NEW_DECK,
	deck: new Deck()
    }
}

export function flipCard(deck, cardId, direction){
    return {
    	type: FLIP_CARD,
	cardId: cardId,
	deck: deck
    }
}