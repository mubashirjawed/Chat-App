import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const list = [];
    const dbSnap = await getDocs(collection(db, "user"));
    dbSnap.forEach((item) => {
      list.push(item.data());
    });
    setUsers(list);
  };

  return (
    <>
      <div className="bg-[#0f546f] w-full p-6 mb-16">
        <h1 className="text-2xl font-bold text-white">User List</h1>
      </div>

      {users.map((item) => (
        <div
          key={item.uid}
          onClick={() => navigate("/chat", { state: item })}
          className=" cursor-pointer w-11/12 shadow-md bg-blue-50 border border-black shadow-gray-500 rounded-md mx-auto my-4 py-5 px-10 flex justify-between "
        >
          <div className="flex items-center">
            <img
              className="w-16 mr-4 rounded-full border-2 border-gray-500"
              src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
              alt=""
              srcset=""
            />
            <div>
              <h1 className="uppercase font-semibold text-xl">{item.name}</h1>
              <h1 className="text-gray-600">{item.email}</h1>
            </div>
          </div>
          <button>Message</button>
        </div>
      ))}
    </>
  );
}
