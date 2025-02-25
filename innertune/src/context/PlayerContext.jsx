import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
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

  const playWithId = async (id) => {
    const index = songsData.findIndex((song) => song.id === id);
    if (index === -1) return;

    if (track && track.id === id) {
      // If the same song is clicked again, reset to start
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Restart song from beginning
        audioRef.current.play();
        setPlayStatus(true);
      }
    } else {
      // Change to new song
      setCurrentTrackIndex(index);
      setTrack(songsData[index]);
    }
  };

  const previous = () => {
    if (currentTrackIndex > 0) {
      const newIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
      setTrack(songsData[newIndex]);
    }
  };

  const next = () => {
    if (currentTrackIndex < songsData.length - 1) {
      const newIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex);
      setTrack(songsData[newIndex]);
    }
  };

  // Automatically update audio when track changes
  useEffect(() => {
    if (track && audioRef.current) {
      const audioUrl = `${url}/${track.audio_url.replace(/^uploads\//, "")}`;
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.play();
      setPlayStatus(true);
    }
  }, [track]); // Runs whenever track updates

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
        setTrack(response.data[0]); // Set first song as default
        setCurrentTrackIndex(0);
      } else {
        console.error(
          "No songs data found or invalid response:",
          response.data
        );
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
      } else {
        console.error("Invalid album data:", response.data);
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
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";

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

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    currentTrackIndex,
    setCurrentTrackIndex,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
