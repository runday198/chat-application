import AuthCard from "../card/AuthCard";
import styles from "./ResultMessage.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";

function ResultMessage(props) {
  var icon = <AiOutlineClose className={styles["error-icon"]} />;

  if (props.hasSucceded) {
    icon = <MdDone className={styles["success-icon"]} />;
  }

  return (
    <AuthCard>
      <div className={styles["result-container"]}>
        {icon}
        <p className={styles["result-message"]}>{props.message}</p>
      </div>
      <div className="link-container">
        <Link to={props.link} className="link">
          {props.linkName}
        </Link>
      </div>
    </AuthCard>
  );
}

export default ResultMessage;
