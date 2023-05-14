import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";

function Home() {
  return (
    <div className={styles["home-container"]}>
      <LeftSideBar />
    </div>
  );
}

export default Home;
