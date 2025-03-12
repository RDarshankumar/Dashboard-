import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import Swal from "sweetalert2"; // Import SweetAlert2
import Logo from "../assets/Images/Logo.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your account has been created successfully!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        navigate("/"); // Redirect after user clicks OK
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          <img src={Logo} alt="Logo" className="mx-auto" />
        </h2>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="relative">
            <label className="block text-gray-600 text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
