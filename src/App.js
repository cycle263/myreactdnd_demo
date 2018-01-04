import React, { Component } from 'react';
import Board from './components/Board';
import { observe } from './components/Game';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.unobserve = observe(this.handleChange.bind(this));
  }

  handleChange(knightPosition) {
    const nextState = { knightPosition };
    if (this.state) {
      this.setState(nextState);
    } else {
      this.state = nextState;
    }
  }

  componentWillUnmount() {
    this.unobserve();
  }

  render() {
    const { knightPosition } = this.state;
    return <Board knightPosition={knightPosition}/>;
  }
}

export default App;