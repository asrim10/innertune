import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import LandingPage from "./components/Public/LandingPage";
import Login from "./components/Public/Login";
import Signup from "./components/Public/SignupPage";
import DisplayHome from "./components/Private/DisplayHome";
import EditButton from "./components/Private/Profile";
import DisplayPlaylist from "./components/Private/DisplayPlaylists";
import DisplayAlbum from "./components/Private/DisplayAlbum";
import AdminDashboard from "./components/Private/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

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

        <Route element={<ProtectedRoute roleRequired={"user"} />}>
          <Route path="/displayhome" element={<DisplayHome />} />{" "}
          <Route path="/album/:id" element={<DisplayAlbum />} />{" "}
          <Route path="/profile" element={<EditButton />} />
          <Route path="/playlist" element={<DisplayPlaylist />} />{" "}
        </Route>

        <Route element={<ProtectedRoute roleRequired={"admin"} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        {""}
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
