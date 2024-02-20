import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

type Props = {
  formData: { location?: L.LatLngExpression };
  setFormData: (formData: any) => void;
};

const LocationMarker: React.FC<Props> = ({ formData, setFormData }) => {
  const [position, setPosition] = useState<L.LatLngExpression | null>(null);
  useEffect(() => {
    if (formData.location && 'lat' in formData.location && 'lng' in formData.location) {
      setPosition(formData.location);
    }
  }, [formData.location]);
  useMapEvents({
    click(e) {
      const confirmed = window.confirm('Is this the place you were referring to?');
      if (confirmed) {
        setPosition(e.latlng);
        setFormData({ ...formData, location: e.latlng });
      }
    },
  });
  return position ? (
    <Marker position={position}>
      <Popup>You have selected this location.</Popup>
    </Marker>
  ) : null;
};

const MapComponent: React.FC<Props> = ({ formData, setFormData }) => {
  const coordinates: L.LatLngExpression = [12.9141, 74.8560];
  return (
    <div className='flex items-center justify-center'>
      <MapContainer center={coordinates} zoom={7} className='w-full' style={{ height: "200px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <LocationMarker formData={formData} setFormData={setFormData} />
    </MapContainer>
    </div>
  );
};

export default MapComponent;