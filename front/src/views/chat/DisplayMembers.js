import styles from "./DisplayMembers.module.css";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePersonRemoveAlt1,
} from "react-icons/md";

function DisplayMembers(props) {
  var { chat } = props;
  chat = chat[0];

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
                      />
                    )}
                    {!user.chatUser.isAdmin && props.selectedChat.isAdmin && (
                      <MdOutlinePersonRemoveAlt1
                        className={`${styles["remove-icon"]}`}
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
