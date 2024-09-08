import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {};

  return (
    <>
      <div className="bg-[#0f546f] w-full p-6 uppercase flex items-center ">
        <img
          className="w-10 mr-10 cursor-pointer"
          onClick={() => navigate("/home")}
          src="https://cdn-icons-png.freepik.com/256/10117/10117847.png?semt=ais_hybrid"
          alt=""
          srcset=""
        />
        <img
          className="w-10 mr-4 rounded-full"
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
          alt=""
          srcset=""
        />
        <h1 className="text-2xl font-bold text-white">{state.name}</h1>
      </div>

      <div className="bg-gray-100 h-[80vh]"></div>

      <div className=" flex items-center justify-center pt-5">
        <input
          placeholder="Enter Message"
          className="w-10/12 border border-gray-500 rounded-lg px-6 py-2 text-xl"
        />
        <button className="text-xl w-30">send</button>
      </div>
    </>
  );
}
