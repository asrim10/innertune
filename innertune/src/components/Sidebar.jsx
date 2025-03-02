import axios from "axios";
import React, { useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar visibility
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistImage, setPlaylistImage] = useState(null);

  const handleCreatePlaylist = async () => {
    const formData = new FormData();
    formData.append("name", playlistName);
    formData.append("description", playlistDesc);
    formData.append("userid", loggedInUserId); // Ensure user_id is included
    if (playlistImage) {
      formData.append("image", playlistImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/playlist/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        setShowModal(false);
        setPlaylistName("");
        setDescription("");
        setPlaylistImage(null);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white text-2xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[#121212] h-full p-2 flex flex-col gap-2 text-white fixed lg:relative z-40 transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 lg:w-[20%]`}
      >
        <div className="h-[15%] rounded flex flex-col justify-around">
          <div
            onClick={() => {
              navigate("/");
              setShowSidebar(false);
            }}
            className="flex items-center gap-3 pl-8 cursor-pointer"
          >
            <img className="w-6" src={assets.home_icon} alt="Home" />
            <p className="font-bold">Home</p>
          </div>
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img className="w-6" src={assets.search_icon} alt="Search" />
            <p className="font-bold">Search</p>
          </div>
        </div>
        <div className="h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="Library" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-5" src={assets.arrow_icon} alt="Arrow" />
              <img
                className="w-5 cursor-pointer"
                src={assets.plus_icon}
                alt="Add"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Create your playlist</h1>
            <p className="font-light">It's easy, we will help you</p>
            <button
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
              onClick={() => setShowModal(true)}
            >
              Create Playlist
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-[#242424] p-6 rounded shadow-lg w-96">
                <h1 className="text-xl font-semibold mb-4">Create Playlist</h1>
                <input
                  type="file"
                  accept="image/*"
                  className="mb-3 w-full"
                  onChange={(e) => setPlaylistImage(e.target.files[0])}
                />
                <input
                  className="p-2 rounded w-full mb-2"
                  type="text"
                  placeholder="Playlist Name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <input
                  className="p-2 rounded w-full mb-4"
                  type="text"
                  placeholder="Description"
                  value={playlistDesc}
                  onChange={(e) => setPlaylistDesc(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleCreatePlaylist}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => {
              navigate("/playlist");
              setShowSidebar(false);
            }}
          >
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="Playlists" />
              <p className="font-semibold">Your Playlists</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
