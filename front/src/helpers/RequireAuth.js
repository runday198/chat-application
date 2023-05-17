import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  var token = localStorage.getItem("token");
  if (!token) {
    return { success: false };
  }

  try {
    let resData = await fetch("http://localhost:5000/check-auth", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    let res = await resData.json();

    return res;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function RequireAuth(props) {
  var loaderData = useLoaderData();
  var navigate = useNavigate();

  useEffect(() => {
    if (!loaderData.success) {
      navigate("/login");
    }
  }, []); //eslint-disable-line

  return <div style={{ width: "100%", height: "100%" }}>{props.children}</div>;
}

export default RequireAuth;
