import styles from "./Input.module.css";

function Input(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      className={styles["input-field"]}
    />
  );
}

export default Input;
