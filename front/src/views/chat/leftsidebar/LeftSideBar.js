import styles from "./LeftSideBar.module.css";
import TopComponent from "./TopComponent";

function LeftSideBar(props) {
  return (
    <div className={styles["sidebar-container"]}>
      <TopComponent />
    </div>
  );
}

export default LeftSideBar;
