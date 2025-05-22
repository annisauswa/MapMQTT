import React, { useState } from 'react';

function MqttSettings({ onConnect }) {
  const [broker, setBroker] = useState('broker.hivemq.com');
  const [port, setPort] = useState('8000');
  const [topic, setTopic] = useState('diamond/tc'); // Setting default topic to "diamond/tc"

  const handleConnect = () => {
    onConnect({ broker, port, topic });
  };

  return (
    <div>
      <h3>MQTT Settings</h3>
      <div>
        <label>Broker:</label>
        <input type="text" value={broker} onChange={(e) => setBroker(e.target.value)} />
      </div>
      <div>
        <label>Port:</label>
        <input type="text" value={port} onChange={(e) => setPort(e.target.value)} />
      </div>
      <div>
        <label>Topic:</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}

export default MqttSettings;
