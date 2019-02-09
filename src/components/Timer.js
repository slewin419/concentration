import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {        
        return (
            <div id="timer">
                {this.props.time || 0}s
            </div>
        );
    }
}

export default Timer;
