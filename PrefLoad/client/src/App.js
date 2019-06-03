import React, { Component } from 'react';
import './App.css';
import socket from './utilities/socketConnection';
import Widget from './components/Widjet';

class App extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {}
    };
  }

  componentDidMount() {
    socket.on('data', data => {
      this.setState = { performanceData: data };
    });
  }

  render() {
    console.log(this.state.performanceData);
    return (
      <div className="App">
        <Widget />;
      </div>
    );
  }
}

export default App;
