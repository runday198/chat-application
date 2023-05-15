import styles from "./TopComponent.module.css";
import { MdOutlineGroupAdd } from "react-icons/md";

import SearchBar from "./SearchBar";

function TopComponent(props) {
  return (
    <div className={styles["top-container"]}>
      <div className={styles["header-container"]}>
        <h1 className={styles["header"]}>Chats</h1>
        <MdOutlineGroupAdd className={styles["group-icon"]} />
      </div>
      <SearchBar />
      <div className={styles["nav-container"]}>
        <button className={styles["nav-button"]}>Inbox</button>
        <button className={styles["nav-button"]}>Requests</button>
      </div>
    </div>
  );
}

export default TopComponent;
