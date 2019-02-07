import React from 'react';

class Card extends React.Component {

    renderMatchedCard(){
        return (
            <div className="card matched"></div>
        )
    }

    render() {
        let {id, img, flipped} = this.props;

        if(flipped === "matched"){
            return this.renderMatchedCard();
        }

        return (
            <div className={'card ' + (flipped ? 'flipped':'')}>
                <div className="card-wrapper ">
                    <div id={id} data-match={img} className="front side"></div>
                    <div className={'back side ' + img}></div>
                </div>
            </div>
        )
    }
}

export default Card;
