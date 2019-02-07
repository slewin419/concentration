import React from 'react';
import Game from './components/Game';
import './App.scss';

class App extends React.Component {

    render() {
        return (
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <Game />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
