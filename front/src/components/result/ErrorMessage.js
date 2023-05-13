import styles from "./ErrorMessage.module.css";

function ErrorMessage(props) {
  return <p className={styles["error-msg"]}>{props.message}</p>;
}

export default ErrorMessage;
