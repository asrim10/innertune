import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]); // Use users instead of user (for consistency)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/user");
        setUsers(response.data.data); // Make sure the response has a 'data' field with user data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`); // Delete user by ID
      setUsers(users.filter((user) => user.id !== id)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-blue-500 text-white text-center rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-xl">{users.length}</p>
        </div>
        <div className="p-4 bg-green-500 text-white text-center rounded-lg">
          <h3 className="text-lg font-semibold">Total Songs</h3>
          <p className="text-xl">50</p>
        </div>
      </div>

      <div className="bg-black p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Manage Users</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-600">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
