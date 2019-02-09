import React from 'react';

class Card extends React.Component {    

    render() {
        let {id, img} = this.props;

        let flipped = this.props.flipped ? 'flipped' : '',
            matched = this.props.matched ? 'matched' : '';

        return (
            <div className={`card ${flipped} ${matched}`}>
                <div className="card-wrapper ">
                    <div id={id} data-match={img} className="front side"></div>
                    <div className={`back side ${img}`}></div>
                </div>
            </div>
        )
    }
}

export default Card;
