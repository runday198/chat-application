import styles from "./ChatDisplay.module.css";
import Message from "./Message";

function ChatDisplay(props) {
  var { messages } = props;

  return (
    <div className={styles["chat-display-container"]}>
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            isSender={message.isSender}
            date={message.date}
            message={message.message}
            sender={message.sender}
          />
        );
      })}
    </div>
  );
}

export default ChatDisplay;
