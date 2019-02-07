import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false
        };
    }

    handleClick(){
        this.setState({flipped: !this.state.flipped});
    }

    render() {
        let flipped = this.state.flipped ? 'flipped': '';
        let {img} = this.props;
        return (
            <div className={'card ' + flipped} onClick={()=>this.handleClick()}>
                <div className="card-wrapper ">
                    <div className="front side"></div>
                    <div className={'back side ' + img}></div>
                </div>
            </div>
        )
    }
}

export default Card;
