import { Socket } from "socket.io-client";
import styles from "./Accept.module.css";

function Accept(props) {
  var { socket } = props;

  function acceptHandler() {
    socket.emit("accept-request", { chatId: props.selectedChat.id });
    var currentChat;

    props.setRequestHeads((prev) => {
      return prev.filter((chat) => {
        if (chat.id === props.selectedChat.id) {
          currentChat = chat;
          return false;
        }
        return true;
      });
    });

    props.setSelectedChat((prev) => {
      return {
        id: prev.id,
        isRequest: false,
      };
    });

    props.setChatHeads((prev) => {
      return [currentChat, ...prev];
    });
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["accept-container"]} onClick={acceptHandler}>
        Accept
      </div>
    </div>
  );
}

export default Accept;
