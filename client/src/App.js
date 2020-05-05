import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";
import logo from "./images/Visitera.png";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
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
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/jordynsaltzman/ck9s1ukqx1fej1ioeyteihsn8"
      onDblClick={showAddMarkerPopup}
    >
      <img
        src={logo}
        alt="Visitera logo"
        style={{ height: "50px", padding: "15px" }}
      />
      {logEntries.map((entry) => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
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
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on {new Date(entry.visitDate).toLocaleDateString}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
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
            <div className="popup">
              <LogEntryForm
                location={addEntryLocation}
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
