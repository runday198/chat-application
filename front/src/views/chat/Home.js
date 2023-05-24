import { Outlet } from "react-router-dom";

import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";
import Middle from "./middle/Middle";

const chats = [
  {
    id: 1,
    name: "Chat head 1",
    lastMessage: "This is a test message",
    sender: "Username",
    seen: false,
    createdAt: "14:53",
  },
  {
    id: 2,
    name: "Chat head 2",
    lastMessage: "This is a test message",
    sender: "runday198",
    seen: true,
    createdAt: "14:53",
  },
  {
    id: 3,
    name: "Chat head 3",
    lastMessage: "This is a test message",
    sender: "Username",
    seen: true,
    createdAt: "14:53",
  },
];

// messages array will contain objects with the following structure:
// {
//   id: 1,
//   sender: "Username",
//   message: "This is a test message",
//   date: "14:53",
//   isSender: false,
// }

const messages = [
  {
    id: 1,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
  {
    id: 2,
    sender: "runday198",
    message: "This is a test message",
    date: "14:53",
    isSender: true,
  },
  {
    id: 3,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
  {
    id: 1,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
  {
    id: 2,
    sender: "runday198",
    message: "This is a test message",
    date: "14:53",
    isSender: true,
  },
  {
    id: 3,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
  {
    id: 1,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
  {
    id: 2,
    sender: "runday198",
    message: "This is a test message",
    date: "14:53",
    isSender: true,
  },
  {
    id: 3,
    sender: "Username",
    message: "This is a test message",
    date: "14:53",
    isSender: false,
  },
];

const user = {
  username: "runday198",
  exposure: true,
  inviteToken: "5e86afd31edd126daf2f25b99ba4872e",
};

const requests = [
  {
    id: 1,
    name: "Req head 1",
    lastMessage: "This is a test message",
    sender: "Username",
    seen: false,
    createdAt: "14:53",
  },
  {
    id: 2,
    name: "Req head 2",
    lastMessage: "This is a test message",
    sender: "runday198",
    seen: false,
    createdAt: "14:53",
  },
];

function Home() {
  return (
    <div className={styles["home-container"]}>
      <LeftSideBar chats={chats} user={user} requests={requests} />
      <Middle messages={messages} />
      <Outlet />
    </div>
  );
}

export default Home;
