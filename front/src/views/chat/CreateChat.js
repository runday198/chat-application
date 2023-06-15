import styles from "./CreateChat.module.css";
import ErrorMessage from "../../components/result/ErrorMessage";
import { useState } from "react";

function CreateChat(props) {
  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();
    var name = event.target.name.value;

    fetchApi().then((res) => {
      console.log(res);
      if (res.error) {
        setError(res.error);
      }
    });

    async function fetchApi() {
      try {
        var resData = await fetch("http://localhost:5000/create-chat", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, isGroupChat: true }),
        });

        let res = await resData.json();

        if (resData.status === 201) {
          props.setChatHeads((prev) => [res.chat, ...prev]);
          props.setCreateChat(false);
          return { error: false };
        }

        return { error: res.errors.name.msg };
      } catch (err) {
        console.log(err);
        return { error: "Internal Error" };
      }
    }
  }

  return (
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1 className={styles["header-text"]}>Create Chat</h1>
        </div>
        <form className={styles["form"]} method="POST" onSubmit={submitHandler}>
          <div className={styles["input-container"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles["name"]}
              autoComplete="off"
            />
            {error && <ErrorMessage message={error} />}
          </div>
          <div className={styles["button-container"]}>
            <div
              className={styles["cancel-button"]}
              onClick={() => props.setCreateChat(false)}
            >
              Cancel
            </div>
            <button type="submit" className={styles["submit-button"]}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChat;
