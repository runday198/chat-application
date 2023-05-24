import styles from "./MiddleChat.module.css";
import ChatDisplay from "./ChatDisplay";

function MiddleChat(props) {
  return (
    <div className={styles["middle-chat-container"]}>
      <ChatDisplay messages={props.messages} />
    </div>
  );
}

export default MiddleChat;
