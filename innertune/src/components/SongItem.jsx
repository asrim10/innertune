import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const SongItem = ({ name, image_url, duration, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
    >
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
        <img
          className="absolute w-full h-full object-cover"
          src={image_url}
          alt={name}
        />
      </div>

      <p className="font-bold mt-2 mb-1 line-clamp-1">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-1">{duration}</p>
    </div>
  );
};
