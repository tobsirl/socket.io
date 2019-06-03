import React, { Component } from 'react';

import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      freeMem,
      totalMem,
      usedMem,
      memUseage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad
    } = this.props.data;
    return (
      <div>
        <h1>Widget!</h1>
        <p>{freeMem}</p>
        <p>{totalMem}</p>
        <p>{usedMem}</p>
        <p>{memUseage}</p>
        <p>{osType}</p>
        <p>{upTime}</p>
        <p>{cpuModel}</p>
        <p>{numCores}</p>
        <p>{cpuSpeed}</p>
        <p>{cpuLoad}</p>
        <Cpu />
        <Mem />
        <Info />
      </div>
    );
  }
}

export default Widget;
