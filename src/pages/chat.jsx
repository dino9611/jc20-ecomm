import axios from "axios";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container } from "../components/general";
import { API_URL } from "../helpers";
import useUser from "../hooks/useUser";
function Chat() {
  const { id, username } = useUser();
  const [recid, setrecid] = useState(0);
  const [contact, setcontact] = useState([
    { id: 6, chats: [] },
    { id: 2, chats: [] },
    { id: 99, chats: [] },
  ]);

  //   const [chats, setchats] = useState([]);
  const [input, setiput] = useState("");
  useEffect(() => {
    const socket = io(API_URL, { auth: { id: id, username } });
    console.log(socket);

    socket.on("chat-masuk", (messages, rece_id, send_id) => {
      console.log(rece_id, "ini rece");
      console.log(send_id, "ini send");
      const index = contact.findIndex((val) => val.id === rece_id);
      console.log(index, "oindex");
      const index2 = contact.findIndex((val) => val.id === send_id);
      console.log(index2, "index2");

      const newMessages = messages.map((val) => {
        if (val.sender_id === id) {
          return {
            ...val,
            fromMe: true,
          };
        } else {
          return {
            ...val,
            fromMe: false,
          };
        }
      });
      console.log(newMessages);

      setcontact((prev) => {
        let newContacts = prev;
        if (index > -1) {
          newContacts[index].chats = newMessages;
        }
        if (index2 > -1) {
          newContacts[index2].chats = newMessages;
        }
        console.log(newContacts);
        return [...newContacts];
      });
      //   setchats(newMessages);
    });

    return () => socket.close();
  }, []);

  const sendMessage = async () => {
    if (recid) {
      await axios.post(`${API_URL}/sendmess`, {
        messages: input,
        sender_id: id,
        recepient_id: recid,
      });
      setiput("");
    } else {
      alert("jangan");
    }
  };

  const renderChat = (recidds) => {
    const index = contact.findIndex((val) => val.id === recidds);
    console.log(index);
    return contact[index]?.chats.map((val, index) => {
      let style = val.sender_id === id ? "self-end" : "";
      return (
        <div key={index} className={"my-2 min-w-[100px] p-3 bg-white " + style}>
          <div>{val.messages}</div>
          <div>{val.sender_id}</div>
        </div>
      );
    });
  };

  const pilihChatnya = async (idrec) => {
    let { data } = await axios.get(`${API_URL}/mess`, {
      params: {
        recepient_id: idrec,
        sender_id: id,
      },
    });
    setrecid(data);
  };

  return (
    <Container>
      <div className="min-h-[80vh]">
        <div className="flex gap-4">
          <button
            onClick={() => setrecid(6)}
            disabled={recid === 6}
            className="bg-white disabled:bg-slate-700 p-3 rounded-lg cursor-pointer"
          >
            dikamacho
          </button>
          <button
            onClick={() => setrecid(2)}
            disabled={recid === 2}
            className="bg-white p-3 disabled:bg-slate-700 rounded-lg cursor-pointer"
          >
            dikaganteng 22
          </button>
          <button
            onClick={() => setrecid(99)}
            disabled={recid === 99}
            className="bg-white p-3 disabled:bg-slate-700 rounded-lg cursor-pointer"
          >
            another
          </button>
        </div>
        <div className="my-4 flex flex-col">{renderChat(recid)}</div>
        <div className="mt-3 flex flex-col">
          <textarea
            value={input}
            onChange={(e) => setiput(e.target.value)}
            className="p-4 w-full h-[20vh]"
          ></textarea>
          <button
            onClick={sendMessage}
            className="mt-2 bg-white self-end p-3 rounded-md cursor-pointer"
          >
            send
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Chat;
