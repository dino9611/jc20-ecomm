import axios from "axios";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container } from "../components/general";
import { API_URL } from "../helpers";
import useUser from "../hooks/useUser";
const PublicLiveChat = () => {
  const [countUser, setcountUser] = useState(0);
  const [input, setinput] = useState("");
  const [chat, setchat] = useState([
    { id: 6, content: "bla", username: "dikamacho" },
    { id: 2, content: "bla", username: "dikaganteng" },
  ]);
  const { id, username } = useUser();

  useEffect(async () => {
    //   initialize socket
    const socket = io(`${API_URL}`, { auth: { id, username } });
    // get data message awal
    let res = await axios.get(`${API_URL}/mess/public`);
    setchat(res.data);
    // event socket
    socket.on("userCount", (userCount) => {
      console.log(userCount);
      setcountUser(userCount);
    });
    // event socket
    socket.on("send-message", (message) => {
      setchat(message);
    });

    // disconnect dengan socket di willunmount
    return () => socket.close();
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post(`${API_URL}/mess/public`, {
        id,
        username,
        content: input,
      });
      setinput("");
    } catch (error) {}
  };

  const renderChat = () => {
    return chat.map((val, index) => {
      let className = val.id === id ? "self-end" : "self-start";
      return (
        <div
          key={index}
          className={
            " p-3 mb-3 rounded-md bg-green-300 max-w-[30%] " + className
          }
        >
          <div className="font-bold mb-2">{val.username}</div>
          <div>{val.content}</div>
        </div>
      );
    });
  };

  return (
    <Container>
      <div>
        <h1>
          public chat span users: <span className="font-bold">{countUser}</span>{" "}
        </h1>
        <div className="my-5 flex flex-col">{renderChat()}</div>
        <div className="mt-2 flex flex-col">
          <textarea
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="w-full mb-3 min-h-[20vh] p-3 bg-white"
          ></textarea>
          <button
            onClick={sendMessage}
            className="bg-green-300 p-3 self-end rounded-md"
          >
            send
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PublicLiveChat;
