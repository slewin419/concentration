import React from 'react';
import Game from './components/Game';
import './App.scss';

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <main>
                    <Game/>
                </main>
            </div>
        );
    }
}

export default App;
