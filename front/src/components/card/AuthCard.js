import styles from "./AuthCard.module.css";

function AuthCard(props) {
  return <div className={styles["auth-card"]}>{props.children}</div>;
}

export default AuthCard;
