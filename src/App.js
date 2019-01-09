import React, { Component } from 'react';
import Provider from './ConcentrationContext';
import { SquareGrid } from './SquareGrid';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
          <SquareGrid size={5}></SquareGrid>
      </Provider>
    );
  }
}

export default App;
