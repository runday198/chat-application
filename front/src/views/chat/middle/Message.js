import styles from "./Message.module.css";

function Message(props) {
  return (
    <div
      className={`${styles["message-container"]} ${
        props.isSender ? styles["right"] : styles["left"]
      }`}
    >
      <div className={styles["message-info"]}>
        <p className={styles["sender"]}>{props.sender}</p>
        <p className={styles["time"]}>{props.date}</p>
      </div>
      <div className={styles["message"]}>
        <p className={styles["message-text"]}>{props.message}</p>
      </div>
    </div>
  );
}

export default Message;
