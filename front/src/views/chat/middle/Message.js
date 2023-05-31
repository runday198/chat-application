import styles from "./Message.module.css";

function Message(props) {
  return (
    <div
      className={`${styles["message-container"]} ${
        props.isSender ? styles["right"] : styles["left"]
      }`}
    >
      <div className={styles["message-info"]}>
        {!props.sameSender && (
          <p className={styles["sender"]}>{props.sender}</p>
        )}
      </div>
      <div className={styles["message"]}>
        <p className={styles["message-text"]}>{props.message}</p>
      </div>
    </div>
  );
}

export default Message;
