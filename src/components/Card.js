import React from 'react';

class Card extends React.Component {
    render() {
        let {id, img, flipped} = this.props;
        return (
            <div className={'card ' + (flipped ? 'flipped':'')}>
                <div className="card-wrapper ">
                    <div data-match={id} className="front side"></div>
                    <div className={'back side ' + img}></div>
                </div>
            </div>
        )
    }
}

export default Card;
