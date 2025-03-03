import React, { useContext, useEffect, useState } from "react";
import Navbar from "../HomeNavbar";
import { Sidebar } from "../HomeSidebar";
import Player from "../Player";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/frontend-assets/assets";
import { PlayerContext } from "../../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams(); // Get album ID from URL
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    // Convert id to string to match album data
    const album = albumsData.find((item) => String(item.id) === id);
    if (album) setAlbumData(album);
  }, [id, albumsData]);

  // Filter songs that belong to this album
  const albumSongs = songsData.filter((song) => String(song.album) === id);

  return albumData ? (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto px-8 pb-20">
        <Navbar />

        {/* Album Header */}
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
          <img
            className="w-48 rounded"
            src={`http://localhost:4000${albumData.image}`}
            alt={albumData.name}
          />
          <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:7xl">{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5"
                src={assets.spotify_logo}
                alt="logo"
              />
              <b> Innertune</b> • {albumData.likes} likes •{" "}
              <b>{albumSongs.length} songs</b>
            </p>
          </div>
        </div>

        {/* Songs List */}
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <p>
            <b className="mr-4">#</b> Title
          </p>
          <p>Album</p>
          <p className="hidden sm:block">Date Added</p>
          <img className="m-auto w-4" src={assets.clock_icon} alt="clock" />
        </div>
        <hr />

        {/* Display only songs from this album */}
        {albumSongs.length > 0 ? (
          albumSongs.map((item, index) => (
            <div
              key={item.id}
              onClick={() => playWithId(item.id)}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                <img
                  className="inline w-10 mr-5"
                  src={item.image_url} // Ensure correct property name
                  alt={item.title}
                />
                {item.title}
              </p>
              <p className="text-[15px]">{albumData.name}</p>
              <p className="text-[15px] hidden sm:block">5 days ago</p>
              <p className="text-[15px] text-center">
                {item.duration || "--:--"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center mt-5 text-gray-400">No songs added yet.</p>
        )}
      </div>

      {/* Fixed Player at the Bottom */}
      <Player />
    </div>
  ) : (
    <p className="text-center text-white mt-10">Loading...</p>
  );
};

export default DisplayAlbum;
