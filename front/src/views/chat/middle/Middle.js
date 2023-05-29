import styles from "./Middle.module.css";
import MiddleTop from "./MiddleTop";
import MiddleChat from "./MiddleChat";
import MessageBox from "./MessageBox";

function Middle(props) {
  return (
    <div className={styles["middle-container"]}>
      <MiddleTop />
      <MiddleChat messages={props.messages} selectedChat={props.selectedChat} />
      <MessageBox
        selectedChat={props.selectedChat}
        socket={props.socket}
        setMessages={props.setMessages}
      />
    </div>
  );
}

export default Middle;
