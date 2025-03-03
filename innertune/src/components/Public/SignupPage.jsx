import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Send signup data to backend
      const response = await axios.post(
        "http://localhost:4000/api/user/add",
        data
      );

      // If successful, backend should return a token
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem("authToken", token);

      toast.success("Registered successfully!");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error("Failed to register. Try again.");
    }
  };

  return (
    <div className="flex w-full h-screen px-10 py-20 rounded-3xl border-2 border-gray-200">
      <ToastContainer />
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div>
          <h1 className="text-4xl font-semibold">Create an Account</h1>
          <p className="font-medium text-lg text-gray-400 mt-4">
            Explore your favourites
          </p>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-lg font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                {...register("username")}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
              <span className="text-red-500">{errors.username?.message}</span>
            </div>
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <div className="relative">
              <label className="text-lg font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
              <span className="text-red-500">{errors.password?.message}</span>
              <button
                type="button"
                className="absolute top-10 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label className="text-lg font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              />
              <span className="text-red-500">
                {errors.confirmPassword?.message}
              </span>
              <button
                type="button"
                className="absolute top-10 right-4"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out cursor-pointer py-3 rounded-xl bg-violet-500 text-white text-lg font-semibold"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">Already have an account?</p>
            <Link
              to="/login"
              className="text-violet-400 text-base font-medium ml-2 py-2 px-3 border rounded-md"
            >
              Login
            </Link>
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

export default Signup;
