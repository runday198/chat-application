import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";

import styles from "./Home.module.css";

import LeftSideBar from "./leftsidebar/LeftSideBar";
import Middle from "./middle/Middle";

export async function loader() {
  try {
    let resData = await fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    let res = await resData.json();

    return res;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function Home() {
  var loaderData = useLoaderData();
  const [chatHeads, setChatHeads] = useState(loaderData.chats);
  const [requestHeads, setRequestHeads] = useState([]);
  console.log(loaderData);

  var user = loaderData.user;

  return (
    <div className={styles["home-container"]}>
      <LeftSideBar chats={chatHeads} user={user} requests={requestHeads} />
      <Middle messages={[]} />
      <Outlet test="test" />
    </div>
  );
}

export default Home;
