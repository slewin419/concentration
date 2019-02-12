import React from 'react';
import TimeFormat from 'hh-mm-ss';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div id="timer">
                {TimeFormat.fromS(this.props.time) || 0}
            </div>
        );
    }
}

export default Timer;
