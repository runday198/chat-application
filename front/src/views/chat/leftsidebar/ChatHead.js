import convertDate from "../../../helpers/convertDate";
import styles from "./ChatHead.module.css";

function ChatHead(props) {
  var { head } = props;
  var isSelected = head.id === Number(props.selectedChat);
  var date = new Date(head.updatedAt);

  date = convertDate(date);

  return (
    <div
      className={`${styles["head-container"]} ${
        isSelected ? styles["active"] : ""
      }`}
      id={head.id}
      onClick={props.chatClickHandler}
    >
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
          {head.sender}
          {head.sender ? ":" : ""} {head.lastMessage}
        </p>
      </div>
      <div className={styles["date-container"]}>
        <p className={styles["date"]}>{date}</p>
      </div>
    </div>
  );
}

export default ChatHead;
