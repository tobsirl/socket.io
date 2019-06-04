import React from 'react';

const Info = (props) => {
  const { macA, osType, upTime, cpuModel, numCores, cpuSpeed } = props.infoData;
  return (
    <div>
      <h1>Info!</h1>
      <p>{macA}</p>
      <p>{osType}</p>
      <p>{upTime}</p>
      <p>{cpuModel}</p>
      <p>{numCores}</p>
      <p>{cpuSpeed}</p>
    </div>
  );
};

export default Info;
