import React from 'react';
import Game from './components/Game';
import './App.scss';

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <main>
                            <Game/>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
