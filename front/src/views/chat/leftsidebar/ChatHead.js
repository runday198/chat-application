import convertDate from "../../../helpers/convertDate";
import styles from "./ChatHead.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts";

function ChatHead(props) {
  var { head } = props;
  var isSelected = head.id === Number(props.selectedChat.id);
  var date = new Date(head.updatedAt);

  var user = useContext(AuthContext);

  console.log(head);

  if (!head.chatUser) {
    head.chatUser = head.users[0].chatUser;
  }

  if (!head.isGroupChat) {
    let contact = head.users.find(
      (chatUser) => chatUser.username !== user.username
    );
    head.name = contact.username;
  }

  date = convertDate(date);

  return (
    <div
      className={`${styles["head-container"]} ${
        isSelected ? styles["active"] : ""
      }`}
      id={head.id}
      onClick={props.chatClickHandler}
      data-seen={head.chatUser.seen}
      data-isrequest={!head.chatUser.hasAccepted}
      data-isadmin={head.chatUser.isAdmin}
    >
      <div className={styles["status-container"]}>
        <div
          className={`${styles["status-circle"]} ${
            head.chatUser.seen ? styles["passive"] : styles["active"]
          }`}
        />
      </div>
      <div className={styles["main-container"]}>
        <p className={styles["chat-name"]}>{head.name}</p>
        <p
          className={`${styles["last-message"]} ${
            head.chatUser.seen ? styles["passive"] : styles["active"]
          }`}
        >
          {head.sender}
          {head.sender ? ":" : ""} {head.lastMessage}
        </p>
      </div>
      <div className={styles["date-container"]}>
        <p className={styles["date"]}>{date}</p>
      </div>
    </div>
  );
}

export default ChatHead;
