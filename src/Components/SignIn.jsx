import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; // Import Firebase auth
import Swal from "sweetalert2"; // Import SweetAlert2
import Logo from "../assets/Images/Logo.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard",{state:{email}}); // Redirect user after login
    } catch (error) {
      let errorMessage = "Something went wrong! Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email!";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password! Try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format!";
      }

      // Show SweetAlert2 alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          <img src={Logo} alt="logo" className="mx-auto" />
        </h2>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full pl-3 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Don't have an account? */}
        <p className="text-sm text-gray-600 text-center mt-4">
          If you don't have an account,{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
