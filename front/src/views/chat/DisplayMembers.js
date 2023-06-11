import styles from "./DisplayMembers.module.css";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePersonRemoveAlt1,
} from "react-icons/md";

function DisplayMembers(props) {
  var { chat, socket, setChatHeads } = props;
  chat = chat[0];

  function adminOnClickHandler(event) {
    var id = event.currentTarget.id;
    socket.emit("make-admin", { chatId: chat.id, userId: id });

    setChatHeads((chats) => {
      return chats.map((chat) => {
        if (chat.id === Number(chat.id)) {
          chat.users = chat.users.map((user) => {
            if (user.id === Number(id)) {
              user.chatUser.isAdmin = true;
            }
            return user;
          });
        }
        return chat;
      });
    });
  }

  return (
    <div className={styles["overlay"]}>
      <div className={styles["members-container"]}>
        <div className={styles["members-header"]}>
          <h1>Members</h1>
        </div>
        <div className={styles["results-container"]}>
          <ul className={styles["results"]}>
            {chat.users.map((user) => {
              return (
                <li className={styles["result"]} key={user.id}>
                  <p className={styles["result-username"]}>{user.username}</p>
                  <div className={styles["action-container"]}>
                    {user.chatUser.isAdmin && (
                      <p className={styles["admin"]}>Admin</p>
                    )}
                    {!user.chatUser.isAdmin && props.selectedChat.isAdmin && (
                      <MdOutlineAdminPanelSettings
                        className={styles["add-icon"]}
                        id={user.id}
                        onClick={adminOnClickHandler}
                      />
                    )}
                    {!user.chatUser.isAdmin &&
                      props.selectedChat.isAdmin &&
                      chat.isGroupChat && (
                        <MdOutlinePersonRemoveAlt1
                          className={`${styles["remove-icon"]}`}
                          id={user.id}
                        />
                      )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className={styles["close-button"]}
          onClick={() => props.setShowMembers(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DisplayMembers;
