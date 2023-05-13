import styles from "./Root.module.css";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

function Root() {
  var navigate = useNavigate();
  var location = useLocation().pathname;

  useEffect(() => {
    if (location === "/") {
      navigate("/login");
    }
  }, []); //eslint-disable-line

  return (
    <div className={styles["root-wrapper"]}>
      <Outlet />
    </div>
  );
}

export default Root;
