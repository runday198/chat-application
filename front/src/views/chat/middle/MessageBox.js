import styles from "./MessageBox.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineAttachment } from "react-icons/md";

function MessageBox(props) {
  // create an input field for chat messages
  return (
    <div className={styles["message-box-container"]}>
      <textarea
        className={styles["message-box"]}
        type="textarea"
        placeholder="Type a message..."
        name="message"
        id="message"
      />
      <div className={styles["button-container"]}>
        <MdOutlineAttachment className={styles["attachment-icon"]} />
        <AiOutlineSend className={styles["send-icon"]} />
      </div>
    </div>
  );
}

export default MessageBox;
