import styles from "./MiddleTop.module.css";
import { FiSettings } from "react-icons/fi";

function MiddleTop() {
  // return a div that will contain the chat header and will be above the chat box
  return (
    <div className={styles["middle-top-container"]}>
      <div className={styles["chat-header"]}>
        <h2 className={styles["chat-header-text"]}>Chat header</h2>
      </div>
      <div className={styles["chat-settings"]}>
        <FiSettings className={styles["chat-settings-icon"]} />
      </div>
    </div>
  );
}

export default MiddleTop;
