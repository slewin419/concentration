import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false
        };
    }

    handleClick(){
        //console.log('clicked');
        this.setState({flipped: !this.state.flipped});
    }

    render() {
        let flipped = this.state.flipped ? 'flipped': '';
        return (
            <div className={'card ' + flipped} onClick={()=>this.handleClick()}>
                <div className="card-wrapper">
                    <div className="front side">Front</div>
                    <div className="back side">Back</div>
                </div>
            </div>
        )
    }
}

export default Card;
