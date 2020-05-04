import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { listLogEntries } from "./API";
import logo from "./images/Visitera.png";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -95,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/jordynsaltzman/ck9s1ukqx1fej1ioeyteihsn8"
    >
      <img
        src={logo}
        alt="Visitera logo"
        style={{ height: "50px", padding: "15px" }}
      />
    </ReactMapGL>
  );
};

export default App;
