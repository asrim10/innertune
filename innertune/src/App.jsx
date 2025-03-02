import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/SignupPage";
import DisplayHome from "./components/DisplayHome";
import EditButton from "./components/Profile";
import DisplayPlaylist from "./components/DisplayPlaylists";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const [isLandingPage, setIsLandingPage] = useState(true);

  const handleStartListening = () => {
    setIsLandingPage(false); // Hide the landing page when the user clicks "Start Listening"
  };

  return (
    <div className="h-screen bg-black w-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/displayhome" element={<DisplayHome />} /> {/* Add this */}
        <Route path="/profile" element={<EditButton />} /> {/* Add this */}
        <Route path="/playlist" element={<DisplayPlaylist />} />{" "}
        {/* Add this */}
        <Route
          path="/"
          element={
            isLandingPage ? (
              <LandingPage onStartListening={handleStartListening} />
            ) : songsData.length !== 0 ? (
              <>
                <div className="h-[90%] flex">
                  <Sidebar />
                  <Display />
                </div>
                <Player />
              </>
            ) : null
          }
        />
      </Routes>

      <audio ref={audioRef} src={track?.audio_url || ""} preload="auto"></audio>
    </div>
  );
};

export default App;
