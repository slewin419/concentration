import React from 'react';
import Game from './components/Game';
import './App.scss';

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <main>
                        <Game/>
                    </main>
                </div>
            </div>
        );
    }
}

export default App;
