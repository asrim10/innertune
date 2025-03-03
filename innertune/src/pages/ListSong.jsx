import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/song/list");
      console.log("Fetch Songs Response:", response.data); // Log the full response

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        toast.error("No songs data found.");
        console.log(
          "Response does not contain valid songs data:",
          response.data
        );
      }
    } catch (error) {
      toast.error("Error occurred while fetching songs");
      console.error(error);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/song/delete",
        {
          id,
        }
      );

      if (response.data.success) {
        toast.success("Song removed successfully");
        await fetchSongs();
      } else {
        toast.error("Failed to remove song");
      }
    } catch (error) {
      toast.error("Error occurred while deleting the song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-black">All Song List</p>
      <br />
      <div>
        <div className="text-black sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-3 p-2 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="text-black grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image_url} alt={item.title} />

              <p>{item.title}</p>
              <p>{item.album}</p>
              <p>{item.duration || "Unknown Duration"}</p>
              <p onClick={() => removeSong(item.id)} className="cursor-pointer">
                x
              </p>
            </div>
          ))
        ) : (
          <p>No songs found</p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
