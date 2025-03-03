import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const DisplayPlaylist = () => {
  //   const [playlists, setPlaylists] = useState([]);

  //   useEffect(() => {
  //     // Fetch playlists from backend
  //     const fetchPlaylists = async () => {
  //       try {
  //         const response = await fetch("http://localhost:4000/api/playlists"); // Update with your backend URL
  //         const data = await response.json();
  //         setPlaylists(data);
  //       } catch (error) {
  //         console.error("Error fetching playlists:", error);
  //       }
  //     };

  //     fetchPlaylists();
  //   }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <Link
            to={`/playlist/${playlist.id}`}
            key={playlist.id}
            className="relative group bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            <img
              src={playlist.coverImage}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
            <p className="text-sm text-gray-400">{playlist.description}</p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
              <Play
                size={30}
                className="bg-green-500 p-2 rounded-full text-white"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayPlaylist;
