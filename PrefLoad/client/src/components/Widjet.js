import React, { Component } from 'react';

import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

import './Widjet.css';

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      macA,
      freeMem,
      totalMem,
      usedMem,
      memUseage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      isActive
    } = this.props.data;
    const cpu = { cpuLoad };
    const mem = { totalMem, usedMem, memUseage, freeMem };
    const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

    let notActiveDiv = '';
    if (!isActive) {
      notActiveDiv = <div className="not-active">Offline</div>;
    }
    return (
      <div className="widget col-sm-12">
        {notActiveDiv}
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
