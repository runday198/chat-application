import { Outlet, useLoaderData, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../contexts";

import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";
import Middle from "./middle/Middle";
import CreateChat from "./CreateChat";
import AddContact from "./AddContact";
import DisplayMembers from "./DisplayMembers";

export async function loader() {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      return redirect("/login");
    }

    let resData = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    let res = await resData.json();

    if (!res.success) {
      return redirect("/login");
    }

    return res;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function Home() {
  var loaderData = useLoaderData();
  var user = loaderData.user;

  const [showMembers, setShowMembers] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [socket, setSocket] = useState(null);
  const [exposure, setExposure] = useState(user.exposure);
  const [createChat, setCreateChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState({
    id: -1,
    isRequest: false,
    isAdmin: false,
  });
  const [messages, setMessages] = useState([]);
  const [chatHeads, setChatHeads] = useState(
    loaderData.chats.filter((chatHead) => chatHead.chatUser.hasAccepted)
  );
  const [requestHeads, setRequestHeads] = useState(
    loaderData.chats.filter((chatHeads) => !chatHeads.chatUser.hasAccepted)
  );

  console.log(chatHeads);

  useEffect(() => {
    let socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(socket);

    socket.on("message", (data) => {
      var { message, chatId } = data;

      var updatedChat = chatHeads.find((chat) => chat.id === chatId);
      updatedChat.lastMessage = message.message;
      updatedChat.lastMessageSender = message.sender;
      updatedChat.updatedAt = message.updatedAt;
      updatedChat.chatUser.seen = false;

      setChatHeads((chats) => {
        var prevChats = chats.filter((chat) => chat.id !== chatId);
        return [updatedChat, ...prevChats];
      });

      if (selectedChat.id == chatId) {
        setMessages((messages) => {
          return [...messages, message];
        });
      }
    });

    return () => {
      socket.close();
    };
  }, [selectedChat]);

  function chatClickHandler(event) {
    var chatId = event.currentTarget.id;
    var isRequest =
      event.currentTarget.dataset.isrequest === "true" ? true : false;

    var isAdmin = event.currentTarget.dataset.isadmin === "true" ? true : false;

    var hasSeen = event.currentTarget.dataset.seen === "true" ? true : false;

    fetchMessages().then((res) => {
      setMessages(res);
      setSelectedChat({ id: chatId, isRequest: isRequest, isAdmin: isAdmin });
      if (!hasSeen) {
        setChatHeads((chats) => {
          return chats.map((chat) => {
            if (chat.id === Number(chatId)) {
              chat.chatUser.seen = 1;
            }
            return chat;
          });
        });
        setRequestHeads((chats) => {
          return chats.map((chat) => {
            if (chat.id === Number(chatId)) {
              chat.seen = 1;
            }
            return chat;
          });
        });
      }
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
          setAddContact={setAddContact}
        />
        <Middle
          messages={messages}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          socket={socket}
          setMessages={setMessages}
          setChatHeads={setChatHeads}
          setRequestHeads={setRequestHeads}
          setShowMembers={setShowMembers}
        />
        <Outlet test="test" />
        {createChat && (
          <CreateChat
            setCreateChat={setCreateChat}
            setChatHeads={setChatHeads}
          />
        )}
        {addContact && (
          <AddContact
            setAddContact={setAddContact}
            socket={socket}
            setChatHeads={setChatHeads}
            setSelectedChat={setSelectedChat}
          />
        )}
      </div>
      {showMembers && (
        <DisplayMembers
          setShowMembers={setShowMembers}
          chat={chatHeads.filter((chat) => chat.id === Number(selectedChat.id))}
          selectedChat={selectedChat}
          socket={socket}
          setChatHeads={
            !selectedChat.isRequest ? setChatHeads : setRequestHeads
          }
        />
      )}
    </AuthContext.Provider>
  );
}

export default Home;
