import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("bgColor", color);
      formData.append("name", name);
      formData.append("description", description);

      const res = await axios.post(
        `http://localhost:4000/api/album/add`,
        formData
      );

      console.log("Response:", res.data); // Log the response data

      if (res.data.success) {
        toast.success("Album added successfully");
        setImage(null);
        setColor("#000000");
        setName("");
        setDescription("");
      } else {
        toast.error("Failed to add album");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
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
            className="w-24 cursor-pointer"
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
