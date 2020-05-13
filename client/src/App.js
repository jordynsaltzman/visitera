import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import * as d3 from "d3-ease";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { listLogEntries } from "./API";
import LogEntryForm from "./components/LogEntryForm";
import EntryPopup from "./components/EntryPopup";
import logo from "./images/Visitera.png";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({ dropdownVal: "" });
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 30,
    longitude: -8,
    zoom: 1.5,
  });

  const getEntries = async () => {
    const logEntriesList = await listLogEntries();
    setLogEntries(logEntriesList);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    setShowPopup({});
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const handleDropdownChange = (event) => {
    var val = event.target.value;
    var valArray = val.split(",");
    var entryId = valArray[0];

    setSelectedTrip({
      dropdownVal: event.target.value,
    });

    setShowPopup({
      [entryId]: true,
    });

    setViewport({
      ...viewport,
      latitude: parseInt(valArray[1]),
      longitude: parseInt(valArray[2]),
      zoom: 5,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    });
  };

  let mapRef = React.useRef();

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/jordynsaltzman/ck9s1ukqx1fej1ioeyteihsn8"
      onDblClick={showAddMarkerPopup}
    >
      <img src={logo} alt="Visitera logo" className="logo" />
      <div className="nav-items">
        <div className="select-div">
          <select
            className="dropdown-menu"
            onChange={handleDropdownChange}
            value={selectedTrip.dropdownVal}
          >
            {logEntries.map((entry) => (
              <option
                className="trip-option"
                key={entry._id}
                value={[entry._id, entry.latitude, entry.longitude]}
              >
                {entry.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {logEntries.length === 0 ? <SplashScreen /> : null}

      <Geocoder
        mapRef={mapRef}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <i
                className="fa fa-map-marker blue-marker"
                aria-hidden="true"
                style={{
                  fontSize: `${5 * viewport.zoom}px`,
                }}
              ></i>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <EntryPopup entry={entry} />
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <i
                className="fa fa-map-marker orange-marker"
                aria-hidden="true"
                style={{
                  fontSize: `${5 * viewport.zoom}px`,
                  // width: `${6 * viewport.zoom}px`,
                }}
              ></i>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <LogEntryForm
              location={addEntryLocation}
              onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }}
            />
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
