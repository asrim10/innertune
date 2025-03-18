import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "./components/Private/HomeSidebar";
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
import AddSongToPlaylist from "./components/Private/AddSongToPlaylist";

// Artist Pages
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import Dashboard from "./pages/ArtistDashboard";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";

// Artist Layout
import ArtistLayout from "./components/ArtistLayout";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const [isLandingPage, setIsLandingPage] = useState(true);

  const handleStartListening = () => {
    setIsLandingPage(false);
  };

  return (
    <div className="h-screen bg-black w-full">
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route element={<ProtectedRoute roleRequired={"user"} />}>
          <Route path="/displayhome" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum />} />
          <Route path="/profile" element={<EditButton />} />
          <Route path="/playlist" element={<DisplayPlaylist />} />
          <Route path="/addsong" element={<AddSongToPlaylist />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute roleRequired={"admin"} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Artist Routes with Layout */}
        <Route element={<ProtectedRoute roleRequired={"artist"} />}>
          <Route path="/artistpanel" element={<ArtistLayout />}>
            <Route index element={<Dashboard />} />{" "}
            <Route path="add-song" element={<AddSong />} />
            <Route path="add-album" element={<AddAlbum />} />
            <Route path="list-song" element={<ListSong />} />
            <Route path="list-album" element={<ListAlbum />} />
          </Route>
        </Route>

        {/* Home / Landing Page */}
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

      {/* Audio Player */}
      <audio ref={audioRef} src={track?.audio_url || ""} preload="auto"></audio>
    </div>
  );
};

export default App;
