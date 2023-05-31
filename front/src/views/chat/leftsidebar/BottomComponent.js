import styles from "./BottomComponent.module.css";
import { FiLock, FiUnlock, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

function BottomComponent(props) {
  var { user, socket } = props;
  var isLocked = !props.exposure;

  var [tokenBox, setTokenBox] = useState(false);

  function usernameClickHandler(event) {
    setTokenBox((state) => !state);
  }

  function lockClickHandler() {
    socket.emit("exposure", { exposure: !props.exposure });
    props.setExposure((state) => !state);
  }

  return (
    <div className={styles["bottom-container"]}>
      <div className={styles["settings-container"]}>
        <p className={styles["username"]} onClick={usernameClickHandler}>
          {user.username}
        </p>
        <div
          className={`${styles["token-box"]} ${tokenBox ? styles["on"] : ""}`}
        >
          {user.inviteToken}
        </div>
        <div className={styles["icon-container"]}>
          {isLocked && (
            <FiLock
              className={`${styles["icon"]} ${styles["lock"]}`}
              onClick={lockClickHandler}
            />
          )}
          <div className={`${styles["info"]} ${styles["lock-box"]}`}>
            When locked, others won't be able to look you up with your username,
            they will need your invite token.
          </div>
          {!isLocked && (
            <FiUnlock
              className={`${styles["icon"]} ${styles["unlock"]}`}
              onClick={lockClickHandler}
            />
          )}
          <div className={`${styles["info"]} ${styles["lock-box"]}`}>
            When unlocked, others will be able to look you up with your
            username.
          </div>
        </div>
      </div>
      <div className={styles["actions-container"]}>
        <div
          className={styles["icon-container"]}
          onClick={() => props.setAddContact(true)}
        >
          <FiUserPlus className={styles["icon"]} />
          <div className={`${styles["info"]} ${styles["contact-box"]}`}>
            Add Contacts
          </div>
        </div>
        <Link to="/home/logout" className={styles["icon-container"]}>
          <FiLogOut className={`${styles["icon"]} ${styles["logout"]}`} />
        </Link>
      </div>
    </div>
  );
}

export default BottomComponent;
