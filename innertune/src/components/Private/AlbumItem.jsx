import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
    >
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
        <img
          className="absolute w-full h-full object-cover"
          src={`http://localhost:4000${image}`}
          alt={name}
        />
      </div>

      <p className="font-bold mt-2 mb-1 line-clamp-1">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-1">{desc}</p>
    </div>
  );
};

export default AlbumItem;
