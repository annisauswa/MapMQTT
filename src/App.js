import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import LocationInput from "./LocationInput";
import "./App.css"; // Keep the default App.css for basic styling
import MqttSettings from "./MqttSettings";
import DataPanel from "./DataPanel"; // Import DataPanel
import mqtt from "mqtt";

function App() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mqttClient, setMqttClient] = useState(null);
  const [mqttMessage, setMqttMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showMqttSettings, setShowMqttSettings] = useState(true); // State to control visibility
  const [mapStyle, setMapStyle] = useState("simple"); // State for map style
  const [vehicleData, setVehicleData] = useState({
    // State for parsed vehicle data
    speed: "N/A",
    acceleration: "N/A",
    heading: "N/A",
    latitude: "N/A",
    longitude: "N/A",
  });

  const handleSetLocation = (position) => {
    setMarkerPosition(position);
  };

  const toggleMqttSettings = () => {
    setShowMqttSettings(!showMqttSettings);
  };

  const handleMqttConnect = ({ broker, port, topic }) => {
    let url = `wss://${broker}:${port}`;
    if (broker === "broker.hivemq.com" && port === "8000") {
      url = `wss://${broker}:${port}/mqtt`;
    }
    const client = mqtt.connect(url);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    });

    client.on("message", (topic, message) => {
      // message is Buffer
      const messageString = message.toString();
      console.log(`Received message on topic ${topic}: ${messageString}`);
      setMqttMessage(messageString);

      // Parse CSV data: "speed, acceleration, heading, lattitude, longitude"
      const dataArray = messageString.split(",");
      if (dataArray.length === 5) {
        setVehicleData({
          speed: dataArray[0].trim(),
          acceleration: dataArray[1].trim(),
          heading: dataArray[2].trim(),
          latitude: dataArray[3].trim(),
          longitude: dataArray[4].trim(),
        });

        // Update marker position with received lat/lng
        const lat = parseFloat(dataArray[3].trim());
        const lng = parseFloat(dataArray[4].trim());
        if (!isNaN(lat) && !isNaN(lng)) {
          setMarkerPosition([lat, lng]);
        } else {
          console.warn(
            "Invalid latitude or longitude received:",
            dataArray[3],
            dataArray[4]
          );
        }
      } else {
        console.warn("Received message in unexpected format:", messageString);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
      setIsConnected(false);
    });

    setMqttClient(client);
  };

  return (
    <div className="App">
      <div
        className={`mqtt-settings-panel ${showMqttSettings ? "" : "hidden"}`}
      >
        <MqttSettings onConnect={handleMqttConnect} />
        {isConnected && <p>Connected to MQTT Broker</p>}
        {mqttMessage && <p>Received Message: {mqttMessage}</p>}
      </div>
      <MapComponent position={markerPosition} mapStyle={mapStyle} />
      {/* <LocationInput onSetLocation={handleSetLocation} /> */}{" "}
      {/* Removed LocationInput */}
      <DataPanel data={vehicleData} /> {/* Add DataPanel */}
      <button className="mqtt-toggle-button" onClick={toggleMqttSettings}>
        {showMqttSettings ? "Hide" : "Show"} MQTT Settings
      </button>
      <button
        className="map-style-button"
        onClick={() =>
          setMapStyle(mapStyle === "simple" ? "satellite" : "simple")
        }
      >
        Change Map Style
      </button>
    </div>
  );
}

export default App;
