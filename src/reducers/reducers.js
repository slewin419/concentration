const initialState = {
    deck: [],
    pendingMatch: [],
    gameStarted: false,
    gameComplete: false,
    time: 0
};

function ConcentrationGame(state = initialState, action) {
    switch(action.type){
	case NEW_DECK:
	    return Object.assign({}, state, {deck: action.deck});
	    break;
	case FLIP_CARD:
	    
	    return Object.assign({}, state, {deck: });
	    break;
    }
}