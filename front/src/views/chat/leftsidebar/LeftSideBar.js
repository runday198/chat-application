import styles from "./LeftSideBar.module.css";
import TopComponent from "./TopComponent";
import MiddleComponent from "./MiddleComponent";
import BottomComponent from "./BottomComponent";

function LeftSideBar(props) {
  return (
    <div className={styles["sidebar-container"]}>
      <TopComponent chats={props.chats} />
      <MiddleComponent chats={props.chats} />
      <BottomComponent />
    </div>
  );
}

export default LeftSideBar;
