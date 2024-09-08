import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";

export default function Home() {
  const [users, setUsers] = useState([]);
  console.log(users);

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
      <div className="bg-[skyblue] w-full p-6">
        <h1 className="text-2xl font-bold text-blue-800">User List</h1>
      </div>

      {users.map((item) => (
        <div className="w-11/12 shadow-md shadow-gray-500 rounded-md mx-auto my-4 py-5 px-10">
          a
        </div>
      ))}
    </>
  );
}
