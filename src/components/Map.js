import { useMemo, useState, useRef } from "react";

import { useEffect } from "react";
import { Marker, GoogleMap, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutoComplete = ({ setSelected, setPosition }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handlePlaceSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    console.log(results);
    const { lat, lng } = getLatLng(results[0]);
    console.log(lat, lng);
    setSelected({ lat, lng });
    setPosition({lat,lng})
  };
  return (
    <Combobox onSelect={handlePlaceSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const Map = ({ position, setPosition, readOnly }) => {
  const [selected, setSelected] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const onMapLoad = (position) => {
    if (!position) {
      console.log("if");
      navigator?.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng };
          setSelected(pos);
          setPosition({
            lat,
            lng,
          });
        }
      );
    } else {
      setSelected(position);
    }
  };
  const markerClickHandler = (event, place) => {
    console.log(event, place);
  };
  const handleMapClick = (e) =>{
    if(readOnly) return
    let { lat, lng } = e.latLng.toJSON();
    setSelected(e.latLng.toJSON());
    console.log(lat, lng);
    setPosition({ lat, lng });
  }
  useEffect(() => {
    onMapLoad(position);
  }, [position]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      {!readOnly && (
        <div>
          <PlacesAutoComplete
            setSelected={setSelected}
            setPosition={setPosition}
          />
        </div>
      )}
      <GoogleMap
        zoom={15}
        center={selected}
        // onLoad={onMapLoad}
        onClick={handleMapClick}
        mapContainerClassName="map-container"
      >
        {selected && (
          <Marker
            position={selected}
            onClick={(event) => markerClickHandler(event)}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
