import React from 'react';

import drawCircle from '../utilities/canvasLoadAnimation';

const Cpu = props => {
  const canvas = document.querySelector('canvas');
  drawCircle(canvas, props.cpuData.cpuLoad);
  return (
    <div className="col-sm-3 cpu">
      <h3>Cpu Load!</h3>
      <div className="canvas-wrapper">
        <canvas className="canvas" width="200" height="200" />
        <div className="cpu-text">{props.cpuData.cpuLoad}</div>
      </div>
    </div>
  );
};

export default Cpu;
