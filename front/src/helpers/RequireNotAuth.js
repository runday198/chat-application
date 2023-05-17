import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequireNotAuth(props) {
  var navigate = useNavigate();

  var token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]); //eslint-disable-line

  return <div style={{ width: "100%", height: "100%" }}>{props.children}</div>;
}

export default RequireNotAuth;
