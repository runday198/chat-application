import styles from "./LeftSideBar.module.css";
import TopComponent from "./TopComponent";
import MiddleComponent from "./MiddleComponent";
import BottomComponent from "./BottomComponent";

import { useState } from "react";

function LeftSideBar(props) {
  var [activeCategory, setActiveCategory] = useState("Inbox");
  var [searchTerm, setSearchTerm] = useState("");

  var { chats } = props;

  if (searchTerm !== "") {
    chats = chats.filter((chat) => {
      return chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  function categoryClickHandler(event) {
    setActiveCategory(event.target.innerHTML);
  }

  return (
    <div className={styles["sidebar-container"]}>
      <TopComponent
        chats={chats}
        categoryClickHandler={categoryClickHandler}
        setCreateChat={props.setCreateChat}
        setSearchTerm={setSearchTerm}
      />

      {activeCategory === "Inbox" && (
        <MiddleComponent
          chats={chats}
          chatClickHandler={props.chatClickHandler}
          selectedChat={props.selectedChat}
        />
      )}

      {activeCategory === "Requests" && (
        <MiddleComponent
          chats={props.requests}
          chatClickHandler={props.chatClickHandler}
          selectedChat={props.selectedChat}
        />
      )}

      <BottomComponent
        user={props.user}
        exposure={props.exposure}
        socket={props.socket}
        setExposure={props.setExposure}
        setAddContact={props.setAddContact}
      />
    </div>
  );
}

export default LeftSideBar;
