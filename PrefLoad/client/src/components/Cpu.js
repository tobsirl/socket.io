import React from 'react';

import drawCircle from '../utilities/canvasLoadAnimation';

const Cpu = props => {
  return (
    <div>
      <h1>Cpu!</h1>
      <p>{props.cpuData.cpuLoad}</p>
    </div>
  );
};

export default Cpu;
