import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const userId = await localStorage.getItem("userId");
    if (userId !== null) navigate("/home");
    else navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
