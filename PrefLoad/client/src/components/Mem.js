import React from 'react';

import drawCircle from '../utilities/canvasLoadAnimation';

const Mem = props => {
  const { totalMem, usedMem, memUseage, freeMem } = props.memData;
  const canvas = document.querySelector('.memCanvas');
  drawCircle(canvas, memUseage * 100);
  const totalMemInGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMem / 1073741824) * 100) / 100;
  const usedMemInGB = Math.floor((usedMem / 1073741824) * 100) / 100;
  return (
    <div className="col-sm-3 mem">
      <h3>Memory Usage!</h3>
      <div className="canvas-wrapper">
        <canvas className="memCanvas" width="200" height="200" />
        <div className="mem-text">{Math.floor(memUseage * 100)}%</div>
        <div>Total Memory: {totalMemInGB}</div>
        <div>Free Memory: {freeMemInGB}</div>
        <div>Used Memory: {usedMemInGB}</div>
      </div>
    </div>
  );
};

export default Mem;
