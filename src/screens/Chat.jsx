import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { myUid, uid, name } = state;
  const [messages, setMessages] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // Correcting the query logic
    const q = query(
      collection(db, "chat"),
      where(myUid, "==", true),
      where(uid, "==", true)
    );

    const unsubscribe = onSnapshot(q, (docSnap) => {
      const list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      const sortList = list.sort((a, b) => a.createdAt - b.createdAt);
      setChatList(sortList);
    });

    return () => unsubscribe();
  }, [myUid, uid]);

  const sendMsg = async () => {
    if (messages.trim() !== "") {
      await addDoc(collection(db, "chat"), {
        messages,
        [uid]: true,
        [myUid]: true,
        senderUid: myUid,
        createdAt: Date.now(),
      });
      setMessages(""); // Clear the input after sending
    }
  };

  return (
    <>
      <div className="bg-[#0f546f] w-full p-6 uppercase flex items-center ">
        <img
          className="w-10 mr-10 cursor-pointer"
          onClick={() => navigate("/home")}
          src="https://cdn-icons-png.freepik.com/256/10117/10117847.png?semt=ais_hybrid"
          alt=""
        />
        <img
          className="w-10 mr-4 rounded-full"
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
          alt=""
        />
        <h1 className="text-2xl font-bold text-white">{name}</h1>
      </div>

      <div className="bg-gray-100 h-[80vh] overflow-y-auto">
        {chatList.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate("/chat", { state: { ...item, myUid } })}
            className={`flex w-full ${
              item.senderUid == myUid ? "justify-end" : "justify-start"
            }`}
          >
            <div className="shadow-md bg-blue-50 border border-black shadow-gray-500 rounded-md mt-4 py-5 px-10">
              <h1 className="font-semibold text-xl">{item.messages}</h1>
              <h1 className="text-gray-400 text-xs">
                {moment(item.createdAt).startOf("seconds").fromNow()}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-5">
        <input
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Enter Message"
          className="w-10/12 border mx-5 border-gray-500 rounded-lg px-6 py-2 text-xl"
        />
        <button
          onClick={sendMsg}
          className="text-xl w-30 py-2 px-5 rounded-lg bg-red-300"
        >
          Send
        </button>
      </div>
    </>
  );
}
