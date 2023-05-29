import styles from "./MessageBox.module.css";
import { AiOutlineSend } from "react-icons/ai";
// import { MdOutlineAttachment } from "react-icons/md";
import { useRef, useContext } from "react";
import { AuthContext } from "../../../contexts";

function MessageBox(props) {
  var { selectedChat, socket } = props;
  var user = useContext(AuthContext);
  const inputRef = useRef("");

  if (!selectedChat) {
    return <></>;
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    var message = inputRef.current.value;
    inputRef.current.value = "";

    message = message.trim();

    if (message) {
      props.setMessages((prev) => {
        return [
          ...prev,
          {
            message: message,
            sender: user.username,
            time: Date.now(),
            id: Math.random(),
          },
        ];
      });
      socket.emit("message", {
        message: message,
        chatId: selectedChat,
      });
    }
  }

  return (
    <form
      className={styles["message-box-container"]}
      onSubmit={onSubmitHandler}
      method="POST"
    >
      <input
        className={styles["message-box"]}
        type="text"
        placeholder="Type a message..."
        name="message"
        id="message"
        rows="5"
        ref={inputRef}
      />
      <div className={styles["button-container"]}>
        {/* <MdOutlineAttachment className={styles["attachment-icon"]} /> */}

        <button className={styles["submit-btn"]} type="submit">
          <AiOutlineSend className={styles["send-icon"]} />
        </button>
      </div>
    </form>
  );
}

export default MessageBox;
