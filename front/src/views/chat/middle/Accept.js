import styles from "./Accept.module.css";

function Accept(props) {
  var { socket, selectedChat } = props;
  var currentChat = { ...selectedChat };

  function acceptHandler() {
    socket.emit("accept-request", { chatId: props.selectedChat.id });

    props.setRequestHeads((prev) => {
      return prev.filter((chat) => {
        if (chat.id === Number(props.selectedChat.id)) {
          return false;
        }
        return true;
      });
    });

    props.setSelectedChat((prev) => {
      return {
        ...prev,
        isRequest: false,
      };
    });

    currentChat.isRequest = false;
    currentChat.chatUser.hasAccepted = true;

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
