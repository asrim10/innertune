import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    const index = songsData.findIndex((song) => song.id === id);
    if (index === -1) return;

    if (track && track.id === id) {
      // If same song is clicked, toggle play/pause
      if (audioRef.current.paused) {
        play();
      } else {
        pause();
      }
    } else {
      setCurrentTrackIndex(index);
      setTrack(songsData[index]);
    }
  };

  const previous = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
      setTrack(songsData[currentTrackIndex - 1]);
    }
  };

  const next = () => {
    if (currentTrackIndex < songsData.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
      setTrack(songsData[currentTrackIndex + 1]);
    }
  };

  useEffect(() => {
    if (track && audioRef.current) {
      const audioUrl = `${url}/${track.audio_url.replace(/^uploads\//, "")}`;
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      play();
    }
  }, [track]);

  const seekSong = (e) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setSongsData(response.data);
        if (!track) {
          setCurrentTrackIndex(0); // Set index, but don't auto-set track
        }
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data && Array.isArray(response.data.albums)) {
        setAlbumsData(response.data.albums);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current.duration) {
          seekBar.current.style.width =
            (audioRef.current.currentTime / audioRef.current.duration) * 100 +
            "%";

          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        }
      };
    }
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumData();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBar,
        seekBg,
        track,
        playStatus,
        time,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
