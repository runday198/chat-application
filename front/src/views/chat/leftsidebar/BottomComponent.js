import styles from "./BottomComponent.module.css";
import { FiLock, FiUnlock, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useState } from "react";

function BottomComponent(props) {
  var { user } = props;

  var [isLocked, setIsLocked] = useState(!user.exposure);

  return (
    <div className={styles["bottom-container"]}>
      <div className={styles["settings-container"]}>
        <p className={styles["username"]}>{user.username}</p>
        <div className={styles["icon-container"]}>
          {isLocked && (
            <FiLock className={`${styles["icon"]} ${styles["lock"]}`} />
          )}
          {!isLocked && (
            <FiUnlock className={`${styles["icon"]} ${styles["unlock"]}`} />
          )}
        </div>
      </div>
      <div className={styles["actions-container"]}>
        <div className={styles["icon-container"]}>
          <FiUserPlus className={styles["icon"]} />
        </div>
        <div className={styles["icon-container"]}>
          <FiLogOut className={`${styles["icon"]} ${styles["logout"]}`} />
        </div>
      </div>
    </div>
  );
}

export default BottomComponent;
