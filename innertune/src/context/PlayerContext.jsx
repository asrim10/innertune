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
  const [track, setTrack] = useState([0]); // Changed to null initially
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    const song = songsData.find((song) => song.id === id);
    if (!song) return;

    const audioUrl = `http://localhost:4000/${song.audio_url.replace(
      /^uploads\//,
      ""
    )}`;
    setTrack({
      ...song,
      audio_url: audioUrl, // Ensure the correct audio path
    });

    console.log("Playing:", audioUrl);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = audioUrl; // Update audio source
        audioRef.current.load(); // Ensure it loads the new track
        audioRef.current.play(); // Play the new track
        setPlayStatus(true);
      }
    }, 500);
  };

  const previous = async () => {
    if (track && track.id > 0) {
      setTrack(songsData[track.id - 1]);
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track && track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      // Check if the response contains songs array
      if (Array.isArray(response.data)) {
        setSongsData(response.data); // Assuming response data is the songs array
        setTrack(response.data[0]); // Set the first song as the default track
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

      // Check if the response contains albums array
      if (response.data && Array.isArray(response.data.albums)) {
        setAlbumsData(response.data.albums); // Set albums data
      } else {
        console.error("Invalid album data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
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
