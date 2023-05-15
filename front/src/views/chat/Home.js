import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";

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

function Home() {
  return (
    <div className={styles["home-container"]}>
      <LeftSideBar chats={chats} />
    </div>
  );
}

export default Home;
