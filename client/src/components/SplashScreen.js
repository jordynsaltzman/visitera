import React from "react";

const SplashScreen = (props) => {
  return (
    <div
      className="splash-screen"
      id={props.show}
      style={{
        opacity: "0.6",
        backgroundColor: "#222",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SplashScreen;
