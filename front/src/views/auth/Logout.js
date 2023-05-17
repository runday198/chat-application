import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  var navigate = useNavigate();
  console.log("LOGOUT");

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []); //eslint-disable-line

  return <></>;
}

export default Logout;
