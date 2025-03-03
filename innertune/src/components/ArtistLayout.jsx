import React from "react";
import { Outlet } from "react-router-dom";
import ArtistSidebar from "./Sidebar";
import Navbar from "./Navbar";

const ArtistLayout = () => {
  return (
    <div className="flex items-start min-h-screen">
      {/* Sidebar */}
      <ArtistSidebar />

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Outlet /> {/* This is where the nested routes will render */}
        </div>
      </div>
    </div>
  );
};

export default ArtistLayout;
