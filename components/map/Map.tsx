/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Previas } from "@/types/data";
import { useCallback, useEffect, useState } from "react";
import MapInfoWindow from "./MapInfoWindows";
import { defaultMapCenter, defaultMapContainerStyle, defaultMapOptions, defaultMapZoom } from "@/lib/constants";


type MapComponentProps = {
  previas: Previas[];
};

export default function MapComponent({ previas }: MapComponentProps) {
  const [selectedPrevia, setSelectedPrevia] = useState<Previas | undefined>(
    undefined,
  );
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);

  const handleMarkerClick = useCallback((previa: Previas) => {
    setSelectedPrevia(previa);
  }, []);

  const handleInfoWindowCloseClick = useCallback(() => {
    setSelectedPrevia(undefined);
  }, []);

  const customIcon = (url: string) => ({
    url,
    scaledSize: new google.maps.Size(30, 30),
  });

  const getPosition = (lat?: string, lng?: string) => ({
    lat: Number(lat) || defaultMapCenter.lat,
    lng: Number(lng) || defaultMapCenter.lng,
  });

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(function (position) {
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker position={mapCenter} />
        {previas.map((previa, index) => (
          <Marker
            key={`${previa.previa_id}_${index}`}
            position={getPosition(previa?.lat, previa?.lng)}
            icon={customIcon(
              previa?.images_previa_url?.[0] || "/images/placeholder.jpg",
            )}
            onClick={() => handleMarkerClick(previa)}
          />
        ))}
        {selectedPrevia && (
          <MapInfoWindow
            position={getPosition(selectedPrevia?.lat, selectedPrevia?.lng)}
            onCloseClick={handleInfoWindowCloseClick}
            previa={selectedPrevia}
          />
        )}
      </GoogleMap>
    </div>
  );
}
