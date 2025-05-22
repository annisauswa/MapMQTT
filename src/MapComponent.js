import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

function MapComponent({ position, mapStyle }) {
    const defaultPosition = [0, 0]; // Default center of the map
    const defaultZoom = 2;

    const simpleMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const satelliteMapUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"; // Using Esri World Imagery
    const satelliteLabelsUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"; // Esri World Boundaries and Places

    const currentMapUrl = mapStyle === 'simple' ? simpleMapUrl : satelliteMapUrl;

    return (
        <MapContainer center={defaultPosition} zoom={defaultZoom} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                url={currentMapUrl}
                attribution={mapStyle === 'simple' ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' : '&copy; <a href="https://www.esri.com/">Esri</a> contributors &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            />
            {mapStyle === 'satellite' && (
                <TileLayer
                    url={satelliteLabelsUrl}
                    attribution='' // Attribution is already in the base layer
                />
            )}
            {position && (
                <Marker position={position}>
                </Marker>
            )}
        </MapContainer>
    );
}

export default MapComponent;
