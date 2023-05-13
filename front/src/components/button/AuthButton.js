import styles from "./AuthButton.module.css";

function AuthButton(props) {
  return (
    <div className={styles["btn-container"]}>
      <button type={props.type} className={styles["auth-btn"]}>
        {props.text}
      </button>
    </div>
  );
}

export default AuthButton;
