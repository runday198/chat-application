import styles from "./MiddleComponent.module.css";
import ChatHead from "./ChatHead.js";

function MiddleComponent(props) {
  var { chats } = props;

  return (
    <div className={styles["middle-container"]}>
      {chats.map((chat) => {
        return <ChatHead head={chat} key={chat.id} />;
      })}
    </div>
  );
}

export default MiddleComponent;
