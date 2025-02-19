import axios from "axios";
import React, { useState, useEffect } from "react";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      // const res = await axios.get(`${url}/api/album/list`);
      if (res.data.success) {
        setData(res.data.albums);
      } else {
        // toast.error("Failed to fetch albums");
      }
    } catch (error) {
      // toast.error("Failed to fetch albums");
    }
  };
  const removeAlbum = async (id) => {
    try {
      const res = await axios.post(`${url}/api/album/remove`, { id });
      if (res.data.success) {
        // toast.success("Album removed successfully");
        await fetchAlbums();
      }
    } catch (error) {
      // toast.error("Error occured");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All albums list</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album color</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgcolor} />
              <p
                onClick={() => removeAlbum(item._id)}
                className="cursor-pointer"
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
