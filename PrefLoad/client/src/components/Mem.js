import React from 'react';

const Mem = props => {
  const { totalMem, usedMem, memUseage, freeMem } = props.memData;
  return (
    <div>
      <h1>Mem!</h1>
      <p>{totalMem}</p>
      <p>{usedMem}</p>
      <p>{memUseage}</p>
      <p>{freeMem}</p>
    </div>
  );
};

export default Mem;
