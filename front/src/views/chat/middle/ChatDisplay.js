import styles from "./ChatDisplay.module.css";
import Message from "./Message";
import { useContext } from "react";

import { AuthContext } from "../../../contexts";

function ChatDisplay(props) {
  var { messages } = props;

  var user = useContext(AuthContext);

  var prevSender = "";

  return (
    <div className={styles["chat-display-container"]}>
      {messages.map((message) => {
        if (message.sender !== prevSender) {
          prevSender = message.sender;
        } else {
          var sameSender = true;
        }

        return (
          <Message
            key={message.id}
            isSender={message.sender === user.username}
            date={message.date}
            message={message.message}
            sender={message.sender}
            sameSender={sameSender}
          />
        );
      })}
    </div>
  );
}

export default ChatDisplay;
