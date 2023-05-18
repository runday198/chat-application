import styles from "./TopComponent.module.css";
// import { MdOutlineGroupAdd } from "react-icons/md";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

import SearchBar from "./SearchBar";

function TopComponent(props) {
  var [inboxActive, setInboxActive] = useState(true);
  var [requestsActive, setRequestsActive] = useState(false);

  function categoryClickHandler(event) {
    console.log(event);
    if (event.target.innerHTML === "Inbox") {
      setInboxActive(true);
      setRequestsActive(false);
    } else {
      setInboxActive(false);
      setRequestsActive(true);
    }
    props.categoryClickHandler(event);
  }

  return (
    <div className={styles["top-container"]}>
      <div className={styles["header-container"]}>
        <h1 className={styles["header"]}>Chats</h1>
        <div className={styles["icon-container"]}>
          <IoCreateOutline className={styles["group-icon"]} />
        </div>
      </div>
      <SearchBar />
      <div className={styles["nav-container"]}>
        <div
          className={`${styles["nav-button"]} ${
            inboxActive ? styles["active"] : ""
          }`}
          onClick={categoryClickHandler}
        >
          Inbox
        </div>
        <div
          className={`${styles["nav-button"]} ${
            requestsActive ? styles["active"] : ""
          }`}
          onClick={categoryClickHandler}
        >
          Requests
        </div>
      </div>
    </div>
  );
}

export default TopComponent;
