import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/album/list");
      console.log("Fetch Albums Response:", res.data); // Log full response

      if (res.data.albums) {
        // Fix: Check if albums exist
        setData(res.data.albums);
        console.log("Albums Data:", res.data.albums);
      } else {
        toast.error("No albums found");
      }
    } catch (error) {
      console.error("Error fetching albums:", error); // Debugging
      toast.error("Failed to fetch albums");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const res = await axios.post("http://localhost:4000/api/album/delete", {
        id, // Send id in request body
      });

      console.log("Delete response:", res.data);

      if (res.data.success) {
        toast.success("Album removed successfully");
        fetchAlbums(); // Refresh album list
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error occurred while deleting album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-black">All albums list</p>
      <br />
      <div>
        <div className="text-black sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album color</b>
          <b>Action</b>
        </div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className=" text-black grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img
                className="w-12"
                src={`http://localhost:4000${item.image}`}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <input type="color" value={item.bgColor} readOnly />
              <p
                onClick={() => removeAlbum(item.id)}
                className="cursor-pointer"
              >
                x
              </p>
            </div>
          ))
        ) : (
          <p>No albums found</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;
