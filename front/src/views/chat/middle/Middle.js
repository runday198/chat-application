import styles from "./Middle.module.css";
import MiddleTop from "./MiddleTop";
import MiddleChat from "./MiddleChat";
import MessageBox from "./MessageBox";
import Accept from "./Accept";

function Middle(props) {
  return (
    <div className={styles["middle-container"]}>
      {props.selectedChat.id !== -1 && (
        <MiddleTop
          selectedChat={props.selectedChat}
          setShowMembers={props.setShowMembers}
        />
      )}
      <MiddleChat messages={props.messages} selectedChat={props.selectedChat} />
      {!props.selectedChat.isRequest && props.selectedChat.id !== -1 && (
        <MessageBox
          selectedChat={props.selectedChat}
          socket={props.socket}
          setMessages={props.setMessages}
          setChatHeads={props.setChatHeads}
        />
      )}
      {props.selectedChat.isRequest && props.selectedChat.id !== -1 && (
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
