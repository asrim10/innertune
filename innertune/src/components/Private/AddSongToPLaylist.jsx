import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSongToPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedSong, setSelectedSong] = useState("");

  useEffect(() => {
    // Fetch playlists and songs
    const fetchData = async () => {
      try {
        const playlistsResponse = await axios.get(
          "http://localhost:4000/api/playlist"
        );
        const songsResponse = await axios.get(
          "http://localhost:4000/api/song/list"
        );

        console.log("Fetched Playlists:", playlistsResponse.data); // Log playlists
        console.log("Fetched Songs:", songsResponse.data); // Log songs

        setPlaylists(playlistsResponse.data);
        setSongs(songsResponse.data);
      } catch (error) {
        console.error("Error fetching playlists or songs:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddSong = async (e) => {
    e.preventDefault();

    if (!selectedPlaylist || !selectedSong) {
      alert("Please select a playlist and a song");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/playlist/add-song",
        {
          playlistId: selectedPlaylist, // ensure this is the correct playlist ID
          songId: selectedSong, // ensure this is the correct song ID
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  return (
    <div className="bg-[#121212] text-white p-6 rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Add Song to Playlist</h1>
      <form onSubmit={handleAddSong} className="flex flex-col gap-4">
        <div>
          {playlists.length === 0 ? (
            <p>Loading playlists...</p> // Shows loading text while data is being fetched
          ) : (
            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="w-full p-2 bg-[#242424] rounded text-white"
            >
              <option value="">Select Playlist</option>
              {playlists.length === 0 ? (
                <option value="">No playlists available</option>
              ) : (
                playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.playlistName}
                  </option>
                ))
              )}
            </select>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Select Song</label>
          <select
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
            className="w-full p-2 bg-[#242424] rounded text-white"
          >
            <option value="">Select Song</option>
            {songs.length === 0 ? (
              <option value="">No songs available</option>
            ) : (
              songs.map((song) => (
                <option key={song.id} value={song.id}>
                  {song.title}
                </option>
              ))
            )}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongToPlaylist;
