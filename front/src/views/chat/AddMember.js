import { useState } from "react";
import styles from "./AddMember.module.css";
import { IoAdd } from "react-icons/io5";

function AddMember(props) {
  const [mode, setMode] = useState("username");
  var { setShowAddMembers } = props;

  return (
    <div className={styles["overlay"]}>
      <div className={styles["add-contact-container"]}>
        <div className={styles["add-member-header"]}>
          <h2>Add Member</h2>
        </div>
        <form className={styles["add-member-form"]}>
          <div className={styles["input-container"]}>
            <div className={styles["mode-container"]}>
              <p className={styles["mode-text"]}>Search By: </p>
              <div
                className={`${styles["mode"]} ${
                  mode === "username" ? styles["active"] : ""
                }`}
                onClick={() => {
                  setMode("username");
                }}
              >
                Username
              </div>
              <div
                className={`${styles["mode"]} ${
                  mode === "token" ? styles["active"] : ""
                }`}
                onClick={() => {
                  setMode("token");
                }}
              >
                Token
              </div>
            </div>
            <input
              type="text"
              name={mode}
              id={mode}
              className={styles["input-field"]}
              placeholder={`Enter a ${mode}`}
            />
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Search
          </button>
        </form>
        <div className={styles["results-container"]}>
          <ul className={styles["results"]}>
            <li className={styles["result"]}>
              <p className={styles["result-username"]}>Username</p>
              <IoAdd className={styles["add-icon"]} />
            </li>
          </ul>
        </div>
        <button
          className={styles["close-button"]}
          onClick={() => {
            setShowAddMembers(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddMember;
