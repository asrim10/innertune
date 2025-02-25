import React, { useState, useContext } from "react";
import { Sidebar } from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import LandingPage from "./components/LandingPage"; // Import the LandingPage component

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const [isLandingPage, setIsLandingPage] = useState(true); // State to track if we show the landing page

  const handleStartListening = () => {
    setIsLandingPage(false); // Hide the landing page when the user clicks "Start Listening"
  };

  return (
    <div className="h-screen bg-black">
      {isLandingPage ? (
        <LandingPage onStartListening={handleStartListening} /> // Pass the function to LandingPage
      ) : songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track?.audio_url || ""} preload="auto"></audio>
    </div>
  );
};

export default App;
