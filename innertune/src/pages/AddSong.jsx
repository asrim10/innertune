import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("album", album);

      const res = await axios.post(
        `http://localhost:4000/api/song/add`,
        formData
      );

      if (res.data.success) {
        toast.success("Song added successfully");
        setImage(false);
        setSong(false);
        setName("");
        setDescription("");
        setAlbum("none");
      } else {
        toast.error("Failed to add song");
      }
    } catch (error) {
      toast.error("Error occurred while adding song");
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/album/list`);
      console.log("Album List Response:", res.data); // Debugging log

      if (res.data.albums) {
        setAlbumData(res.data.albums);
      } else {
        toast.error("No albums found");
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      toast.error("Error occurred while fetching albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  useEffect(() => {
    console.log("Updated albumData:", albumData); // Debugging log
  }, [albumData]);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="bg-transparent outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="bg-transparent outline-green-600 border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.length > 0 ? (
            albumData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>No Albums Found</option>
          )}
        </select>
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default AddSong;
