import styles from "./MiddleTop.module.css";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";

function MiddleTop(props) {
  // return a div that will contain the chat header and will be above the chat box
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles["middle-top-container"]}>
      <div className={styles["chat-header"]}>
        <h2 className={styles["chat-header-text"]}>Chat header</h2>
      </div>
      <div className={styles["chat-settings"]}>
        <FiSettings
          className={styles["chat-settings-icon"]}
          onClick={() => {
            setShowSettings((currentSettings) => !currentSettings);
          }}
        />
        {showSettings && (
          <div className={styles["settings-container"]}>
            <div
              className={styles["setting-item"]}
              onClick={() => {
                props.setShowMembers(true);
                setShowSettings(false);
              }}
            >
              Members
            </div>
            {props.selectedChat.isAdmin && (
              <div className={styles["setting-item"]}>Add Member</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MiddleTop;
