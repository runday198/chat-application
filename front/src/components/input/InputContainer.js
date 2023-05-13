import styles from "./InputContainer.module.css";

function InputContainer(props) {
  return <div className={styles["input-container"]}>{props.children}</div>;
}

export default InputContainer;
