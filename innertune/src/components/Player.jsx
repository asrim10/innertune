import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    audioRef,
    songsData,
    playWithId,
  } = useContext(PlayerContext);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevents page scrolling
        playStatus ? pause() : play();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playStatus, play, pause]);

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      // Shuffle the playlist
      let shuffled = [...songsData].sort(() => Math.random() - 0.5);
      setShuffledSongs(shuffled);
    }
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    const randomSong = songsData[randomIndex];
    playWithId(randomSong.id);
  };

  return track ? (
    <div className="fixed bottom-0 left-0 w-full h-[10%] bg-black flex justify-between items-center text-white px-4 z-50">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track?.image_url || ""} alt="" />
        <div>
          <p>{track?.title || "Unknown Track"}</p>
          <p>{track?.desc?.slice(0, 12) || "No Description"}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            onClick={toggleShuffle}
            className="w-4 cursor-pointer"
            src={isShuffled ? assets.green_icon : assets.shuffle_icon}
            alt="shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="previous"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="play"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="next"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="loop"
          />
        </div>
        <div className="flex items-center gap-4">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>

      {/* Volume Control */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        {/* Mute/Unmute */}
        <img
          className="w-4 cursor-pointer"
          src={isMuted ? assets.volume_icon : assets.volume_icon}
          alt="volume"
          onClick={toggleMute}
        />

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="w-20 h-1 rounded-lg bg-green-700 appearance-none cursor-pointer"
        />

        <img className="w-4" src={assets.mini_player_icon} alt="mini player" />
        <img className="w-4" src={assets.zoom_icon} alt="zoom" />
      </div>
    </div>
  ) : null;
};

export default Player;
