import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../contexts";

import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";
import Middle from "./middle/Middle";
import CreateChat from "./CreateChat";

export async function loader() {
  try {
    let resData = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    let res = await resData.json();

    return res;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function Home() {
  var loaderData = useLoaderData();
  var user = loaderData.user;

  const [socket, setSocket] = useState(null);
  const [exposure, setExposure] = useState(user.exposure);
  const [createChat, setCreateChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatHeads, setChatHeads] = useState(
    loaderData.chats.filter((chatHead) => chatHead.chatUser.hasAccepted)
  );
  const [requestHeads, setRequestHeads] = useState(
    loaderData.chats.filter((chatHeads) => !chatHeads.chatUser.hasAccepted)
  );

  useEffect(() => {
    let socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(socket);

    socket.on("hello", (data) => {
      console.log(data);
    });

    socket.emit("hello", { message: "hello" });
  }, []);

  function chatClickHandler(event) {
    var chatId = event.currentTarget.id;

    fetchMessages().then((res) => {
      console.log(res);
      setMessages(res);
      setSelectedChat(chatId);
    });

    async function fetchMessages() {
      try {
        var resData = await fetch("http://localhost:5000/messages/", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatId }),
        });

        let res = await resData.json();

        if (resData.status === 200) {
          return res.messages;
        }

        return [];
      } catch (err) {
        console.log(err);
        return [];
      }
    }
  }

  return (
    <AuthContext.Provider value={user}>
      <div className={styles["home-container"]}>
        <LeftSideBar
          chats={chatHeads}
          user={user}
          requests={requestHeads}
          setCreateChat={setCreateChat}
          chatClickHandler={chatClickHandler}
          selectedChat={selectedChat}
          exposure={exposure}
          socket={socket}
          setExposure={setExposure}
        />
        <Middle
          messages={messages}
          selectedChat={selectedChat}
          socket={socket}
          setMessages={setMessages}
        />
        <Outlet test="test" />
        {createChat && (
          <CreateChat
            setCreateChat={setCreateChat}
            setChatHeads={setChatHeads}
          />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default Home;
