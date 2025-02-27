import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import { SongItem } from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
import Player from "./Player";
import { Sidebar } from "./Sidebar";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  console.log(songsData);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto px-8 pb-20">
        <Navbar />

        {/* Featured Charts */}
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
          <div className="flex overflow-auto">
            {albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.description}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* Today's Biggest Hits */}
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className="flex overflow-auto">
            {songsData.map((song) => (
              <SongItem
                key={song.id}
                name={song.title}
                duration={song.duration}
                id={song.id}
                image_url={song.image_url}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Player Fixed at Bottom */}
      <Player />
    </div>
  );
};

export default DisplayHome;
