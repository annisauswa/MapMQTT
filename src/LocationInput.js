import React, { useState } from 'react';

function LocationInput({ onSetLocation }) {
    const [latitude, setLatitude] = useState('0');
    const [longitude, setLongitude] = useState('0');
    const [isOpen, setIsOpen] = useState(false);

    const handleShowMap = () => {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lng)) {
            alert('Please enter valid latitude and longitude.');
            return;
        }

        onSetLocation([lat, lng]);
        setIsOpen(false); // Close the pop-up after setting location
    };

    return (
        <>
            <button
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    zIndex: 1000,
                }}
                onClick={() => setIsOpen(true)}
            >
                Set Location
            </button>

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                    }}
                >
                    <h2>Set Location</h2>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="latitude">Latitude:</label>
                        <input
                            type="text"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="longitude">Longitude:</label>
                        <input
                            type="text"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
                        />
                    </div>
                    <button
                        onClick={handleShowMap}
                        style={{
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        Show on Map
                    </button>
                </div>
            )}
        </>
    );
}

export default LocationInput;
