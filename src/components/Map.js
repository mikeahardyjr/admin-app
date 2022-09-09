import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  //  Circle,
  Tooltip,
} from "react-leaflet";
import { useMemo, useState, useRef } from "react";
import { Button } from "antd";

import { useEffect } from "react";

const Map = (props) => {
  const [position, setPosition] = useState([0, 0]);
  const refmarker = useRef(null);

  const [showMyLocation, setShowMyLocation] = useState(false);
  const [liveLocation, setLiveLocation] = useState([]);

  useEffect(() => {
    if (!props.location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.accuracy);
          // setAcc(position.coords.accuracy);

          setPosition([position.coords.latitude, position.coords.longitude]);
          if (!props.readOnly) {
            props?.setCenter([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          }
        },
        (e) => {
          console.log(e);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log(props.location);
      setPosition(props.location);
      if (!props.readOnly) {
        props?.setCenter(props.location);
      }
    }
  }, []);

  const getLiveLocation = () => {
    if (!showMyLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLiveLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setShowMyLocation(true);
        },
        (e) => {
          console.log(e);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setShowMyLocation(false);
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = refmarker.current;
        if (marker != null) {
          let lat = marker.getLatLng().lat;
          let lng = marker.getLatLng().lng;
          setPosition([lat, lng]);
          if (!props.readOnly) {
            props.setCenter([lat, lng]);
          }
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ height: "70%", width: "100%" }}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
        />
        <MapContainer
          dragging={true}
          key={Math.random() * 100 + "as9di214b"}
          center={props.location}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "400px" }}
        >
          <TileLayer
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            draggable={true}
            ref={refmarker}
            riseOnHover={true}
            eventHandlers={eventHandlers}
            position={props.location}
            // icon={greenIcon}
          >
            <Popup>Drag Onto your Location</Popup>
          </Marker>

          {showMyLocation && (
            <Marker position={liveLocation}>
              <Tooltip
                direction="bottom"
                offset={[0, 20]}
                opacity={1}
                permanent
              >
                YOUR LIVE LOCATION
              </Tooltip>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
