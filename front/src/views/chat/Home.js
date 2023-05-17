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

const user = {
  username: "runday198",
  exposure: true,
  inviteToken: "5e86afd31edd126daf2f25b99ba4872e",
};

function Home() {
  return (
    <div className={styles["home-container"]}>
      <LeftSideBar chats={chats} />
    </div>
  );
}

export default Home;
