import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequireAuth(props) {
  var navigate = useNavigate();

  useEffect(() => {
    async function fetchAuth() {
      let resData = await fetch("http://localhost:5000/check-auth", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let res = await resData.json();
      if (!res.success) {
        navigate("/login");
      }
    }
    fetchAuth();
  }, []); //eslint-disable-line

  return <div style={{ width: "100%", height: "100%" }}>{props.children}</div>;
}

export default RequireAuth;
