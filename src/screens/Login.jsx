// src/LoginPage.js
import Swal from "sweetalert2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Password:", password);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        localStorage.setItem("userId", uid);
        setIsLoading(false);

        Swal.fire({
          title: "Login Successfully!",
          text: "",
          icon: "success",
        });
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong!",
          text: error.message,
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10">
                <img
                  className="w-full animate-spin"
                  src="https://img.freepik.com/free-vector/loading-circles-blue-gradient_78370-2646.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              onClick={handleSignin}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          )}
          <div className="w-full text-sm pt-5 flex items-center justify-between">
            <p>login?</p>
            <p>forgot password?</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
