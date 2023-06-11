import { useState } from "react";
import styles from "./AddMember.module.css";
import { IoAdd } from "react-icons/io5";

function AddMember(props) {
  const [mode, setMode] = useState("username");
  const [results, setResults] = useState([]);

  var { setShowAddMembers, socket, setChatHeads, selectedChat } = props;

  function submitHandler(event) {
    event.preventDefault();
    var searchTerm =
      mode === "username"
        ? event.target.username.value
        : event.target.token.value;

    fetchResults();

    async function fetchResults() {
      try {
        let resData = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ searchTerm, mode }),
        });

        let res = await resData.json();

        if (resData.status === 200) {
          setResults(res.users);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function addMemberClickHandler(event) {
    var userId = event.currentTarget.id;

    socket.emit("add-member", { userId, chatId: selectedChat.id });
    socket.once("add-member", (data) => {
      var { chat } = data;

      setChatHeads((chats) => {
        return chats.map((chatHead) => {
          if (chatHead.id === chat.id) {
            return chat;
          }
          return chatHead;
        });
      });

      setResults([]);
    });
  }

  return (
    <div className={styles["overlay"]}>
      <div className={styles["add-contact-container"]}>
        <div className={styles["add-member-header"]}>
          <h2>Add Member</h2>
        </div>
        <form className={styles["add-member-form"]} onSubmit={submitHandler}>
          <div className={styles["input-container"]}>
            <div className={styles["mode-container"]}>
              <p className={styles["mode-text"]}>Search By: </p>
              <div
                className={`${styles["mode"]} ${
                  mode === "username" ? styles["active"] : ""
                }`}
                onClick={() => {
                  setMode("username");
                }}
              >
                Username
              </div>
              <div
                className={`${styles["mode"]} ${
                  mode === "token" ? styles["active"] : ""
                }`}
                onClick={() => {
                  setMode("token");
                }}
              >
                Token
              </div>
            </div>
            <input
              type="text"
              name={mode}
              id={mode}
              className={styles["input-field"]}
              placeholder={`Enter a ${mode}`}
            />
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Search
          </button>
        </form>
        <div className={styles["results-container"]}>
          <ul className={styles["results"]}>
            {results.map((result) => {
              return (
                <li className={styles["result"]} key={result.id} id={result.id}>
                  <p className={styles["result-username"]}>{result.username}</p>
                  <IoAdd
                    className={styles["add-icon"]}
                    id={result.id}
                    onClick={addMemberClickHandler}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className={styles["close-button"]}
          onClick={() => {
            setShowAddMembers(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddMember;
