import styles from "./ChatHead.module.css";
import { Link } from "react-router-dom";

function ChatHead(props) {
  var { head } = props;
  var link = `/home/chat/${head.id}`;

  return (
    <Link className={styles["head-container"]} to={link}>
      <div className={styles["status-container"]}>
        <div
          className={`${styles["status-circle"]} ${
            head.seen ? styles["passive"] : styles["active"]
          }`}
        />
      </div>
      <div className={styles["main-container"]}>
        <p className={styles["chat-name"]}>{head.name}</p>
        <p
          className={`${styles["last-message"]} ${
            head.seen ? styles["passive"] : styles["active"]
          }`}
        >
          {head.sender}: {head.lastMessage}
        </p>
      </div>
      <div className={styles["date-container"]}>
        <p className={styles["date"]}>{head.createdAt}</p>
      </div>
    </Link>
  );
}

export default ChatHead;
