import styles from "./Input.module.css";
import InputContainer from "./InputContainer";

function Input(props) {
  return (
    <InputContainer>
      <label htmlFor={props.id} className={styles["label"]}>
        {props.id}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        className={styles["input-field"]}
      />
    </InputContainer>
  );
}

export default Input;
