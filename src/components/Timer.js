import React from 'react';
import TimeFormat from 'hh-mm-ss';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0
        };

        this.timer = null;

        console.log(this.props);
    }

    start(){
        this.timer = setInterval(() => {
            this.setState({time: this.state.time + 1});
        }, 1000);
    }

    stop(){
        clearInterval(this.timer);
    }

    reset(){
        this.setState({time: 0}, () => {
            this.stop();
        });
    }

    componentWillReceiveProps(props){
        if(props.running && this.state.time === 0){
            this.start();
        }

        if(!props.running && this.state.time > 0){
            this.stop();
        }
    }

    render() {
        return (
            <div id="timer">
                { TimeFormat.fromS(this.state.time) || 0 }
            </div>
        );
    }
}

export default Timer;
