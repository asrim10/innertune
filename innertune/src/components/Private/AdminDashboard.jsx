import { useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

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
                <td className="border p-2">{user.name}</td>
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
