import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Private/HomeNavbar"; // Adjust the import if necessary
import { Sidebar } from "../Private/HomeSidebar"; // Adjust the import if necessary
import Player from "../Player"; // Adjust the import if necessary

const DisplayPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/playlist");
        const data = await response.json();
        console.log("Fetched Playlists:", data); // Log playlists for debugging
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto px-8 pb-20">
        {/* Navbar */}
        <Navbar />

        {/* Playlists Section */}
        <div className="pt-16">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Your Playlists
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.length === 0 ? (
              <p>No playlists available</p>
            ) : (
              playlists.map((playlist) => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                  <div className="bg-[#242424] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
                    <img
                      src={playlist.playlistImg || "path/to/default-image.jpg"} // Fallback image
                      alt={playlist.playlistName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">
                        {playlist.playlistName}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {playlist.playlistDesc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Player Fixed at Bottom */}
      <Player />
    </div>
  );
};

export default DisplayPlaylist;
