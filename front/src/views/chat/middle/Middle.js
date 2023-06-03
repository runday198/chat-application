import styles from "./Middle.module.css";
import MiddleTop from "./MiddleTop";
import MiddleChat from "./MiddleChat";
import MessageBox from "./MessageBox";
import Accept from "./Accept";

function Middle(props) {
  console.log(props.selectedChat);
  return (
    <div className={styles["middle-container"]}>
      <MiddleTop />
      <MiddleChat messages={props.messages} selectedChat={props.selectedChat} />
      {!props.selectedChat.isRequest && (
        <MessageBox
          selectedChat={props.selectedChat}
          socket={props.socket}
          setMessages={props.setMessages}
          setChatHeads={props.setChatHeads}
        />
      )}
      {props.selectedChat.isRequest && (
        <Accept
          setRequestHeads={props.setRequestHeads}
          selectedChat={props.selectedChat}
          setSelectedChat={props.setSelectedChat}
          socket={props.socket}
          setChatHeads={props.setChatHeads}
        />
      )}
    </div>
  );
}

export default Middle;
