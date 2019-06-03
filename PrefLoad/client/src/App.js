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
      // inside this callbackify, we just got some new data!
      // let's update state so we can
      // re-render App --> Widget --> Cpu/Mem/Info
      // we need to make a copy of current state
      // so we can mutate it!
      const currentState = { ...this.state.performanceData };
      // currentState is an object! not an array!
      // the reason for this is so we can use the machine's
      // macA as it's property
      currentState[data.macA] = data;
      this.setState({ performanceData: currentState });
    });
  }

  render() {
    // console.log(this.state.performanceData);
    let widgets = [];
    const data = this.state.performanceData;
    // grab each machine, by property, from data
    Object.entries(data).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />);
    });
    return <div className="App">{widgets}</div>;
  }
}

export default App;
