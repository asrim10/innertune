import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/user/id", {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token for authentication
            },
          });

          const data = await response.json();
          if (data.data) {
            setUser(data.data); // Set user data in state
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <div className="flex justify-center">
          <img
            className="w-20 h-20 rounded-full border-2 border-purple-500"
            src="https://www.istockphoto.com/photos/placeholder-image" // Replace with actual profile image URL
          />
        </div>
        <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
        <p className="text-gray-400 text-sm">{user.email}</p>{" "}
        {/* Display email here */}
        <p className="bg-purple-500 text-black px-3 py-1 rounded-lg mt-3 inline-block">
          {user.role} {/* Display role here */}
        </p>
        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg">
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
