import styles from "./Middle.module.css";
import MiddleTop from "./MiddleTop";
import MiddleChat from "./MiddleChat";
import MessageBox from "./MessageBox";

function Middle(props) {
  //  return a div that is 100 vh and 100% width
  return (
    <div className={styles["middle-container"]}>
      <MiddleTop />
      <MiddleChat messages={props.messages} />
      <MessageBox />
    </div>
  );
}

export default Middle;
