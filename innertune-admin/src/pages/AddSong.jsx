import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
      formData.append("name", name);
      formData.append("description", description);
      formData.append("album", album);

      // const res = await axios.post(`${url} / api / song / add`, formData);

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
      toast.error("Error occured");
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if (res.data.success) {
        setAlbumData(res.data.albums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

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
          defaultValue={album}
          className="bg-transparent outline-green-600 border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
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
