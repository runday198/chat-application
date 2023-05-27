import styles from "./LeftSideBar.module.css";
import TopComponent from "./TopComponent";
import MiddleComponent from "./MiddleComponent";
import BottomComponent from "./BottomComponent";

import { useState } from "react";

function LeftSideBar(props) {
  var [activeCategory, setActiveCategory] = useState("Inbox");

  function categoryClickHandler(event) {
    setActiveCategory(event.target.innerHTML);
  }

  return (
    <div className={styles["sidebar-container"]}>
      <TopComponent
        chats={props.chats}
        categoryClickHandler={categoryClickHandler}
      />
      {activeCategory === "Inbox" && <MiddleComponent chats={props.chats} />}
      {activeCategory === "Requests" && (
        <MiddleComponent chats={props.requests} />
      )}
      <BottomComponent user={props.user} />
    </div>
  );
}

export default LeftSideBar;
