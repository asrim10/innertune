import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const ArtistSidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw] text-white w-[250px]">
      <img
        src={assets.logo}
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
        alt="Logo"
      />
      <img
        src={assets.logo_small}
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
        alt="Small Logo"
      />
      <div className="flex flex-col gap-5 mt-10">
        {/* Dashboard Link */}
        <NavLink
          to="/artistpanel"
          className="flex items-center gap-2.5 text-gray-800 bg-white p-2 pr-[max(8vw,10px)] 
                     drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.dashboard_icon} className="w-5" alt="Dashboard" />
          <p className="hidden sm:block">Dashboard</p>
        </NavLink>

        {/* Add Song Link */}
        <NavLink
          to="/artistpanel/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white p-2 pr-[max(8vw,10px)] 
                     drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_song} className="w-5" alt="Add Song" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>

        {/* List Song Link */}
        <NavLink
          to="/artistpanel/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white p-2 pr-[max(8vw,10px)] 
                     drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-5" alt="List Song" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>

        {/* Add Album Link */}
        <NavLink
          to="/artistpanel/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white p-2 pr-[max(8vw,10px)] 
                     drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_album} className="w-5" alt="Add Album" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>

        {/* List Album Link */}
        <NavLink
          to="/artistpanel/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white p-2 pr-[max(8vw,10px)] 
                     drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-5" alt="List Album" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>
    </div>
  );
};

export default ArtistSidebar;
