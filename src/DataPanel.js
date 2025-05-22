import React from 'react';

const DataPanel = ({ data }) => {
  // Assuming data is an object like { speed: ..., acceleration: ..., heading: ..., latitude: ..., longitude: ... }
  return (
    <div className="data-panel">
      <h3>Vehicle Data</h3>
      <p>Speed: {data.speed} m/s</p>
      <p>Acceleration: {data.acceleration} m/s²</p>
      <p>Heading: {data.heading} °</p>
      <p>Latitude: {data.latitude}</p>
      <p>Longitude: {data.longitude}</p>
    </div>
  );
};

export default DataPanel;
