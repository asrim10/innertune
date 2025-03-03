import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const data = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data.access_token) {
        const { access_token, role, userId } = response.data.data;

        // Store token, role, and userId in localStorage
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);

        // Log the values after saving them to localStorage
        console.log("Token, Role, and UserId saved in localStorage");
        console.log("UserId:", localStorage.getItem("userId")); // Log to ensure the value is saved

        // Redirect based on role
        if (role === "user") {
          navigate("/displayhome");
        } else if (role === "artist") {
          navigate("/artistpanel");
        } else if (role === "admin") {
          navigate("/admin");
        }
      } else {
        alert("Login failed! Check credentials.");
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response ? err.response.data : err.message
      );
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen px-10 py-20 rounded-3xl border-2 border-gray-200">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div>
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg text-gray-200 mt-4">
            Welcome back! Please enter your details.
          </p>
          <div className="mt-8">
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
            </div>
            <div>
              <label className="text-lg font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
            </div>
            {/* Display error message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-8 flex justify-between items-center">
              <button className="font-medium text-base text-violet-500">
                Forgot password
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleLogin}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out cursor-pointer py-3 rounded-xl bg-violet-500 text-white text-lg font-semibold"
              >
                Log in
              </button>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Don't have an account?</p>
                <button className="text-violet-400 text-base font-medium ml-2">
                  <Link to="/signup" className="py-2 px-3 border rounded-md">
                    Sign up
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative justify-center items-center w-1/2 bg-black lg:flex h-full">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
        <div className="w-full h-1/3 absolute bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Login;
