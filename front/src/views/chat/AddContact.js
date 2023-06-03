import styles from "./AddContact.module.css";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

function AddContact(props) {
  var [mode, setMode] = useState("username");
  var [results, setResults] = useState([]);
  var { socket } = props;

  function modeOnClickHandler(event) {
    setMode(event.target.innerHTML.toLowerCase());
  }

  function submitHandler(event) {
    event.preventDefault();
    var searchTerm;
    if (mode === "username") {
      searchTerm = event.target.username.value;
    } else {
      searchTerm = event.target.token.value;
    }
    fetchResults();

    async function fetchResults() {
      try {
        var resData = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm, mode }),
        });

        var res = await resData.json();

        if (resData.status === 200) {
          setResults(res.users);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function addClickHandler(event) {
    var userId = event.currentTarget.id;

    socket.emit("add-contact", { userId });
    socket.once("add-contact", (data) => {
      var { chat } = data;

      props.setChatHeads((chats) => {
        return [...chats, chat];
      });

      props.setSelectedChat(chat.id);
    });
  }

  return (
    <div className={styles["overlay"]}>
      <div className={styles["add-contact-container"]}>
        <div className={styles["add-contact-header"]}>
          <h2 className={styles["add-contact-header-text"]}>Add Contact</h2>
        </div>
        <form
          className={styles["add-contact-form"]}
          method="POST"
          onSubmit={submitHandler}
        >
          <div className={styles["input-container"]}>
            <div className={styles["mode-container"]}>
              <p className={styles["mode-text"]}>Search By: </p>
              <div
                className={`${styles["mode"]} ${
                  mode === "username" ? styles["active"] : ""
                }`}
                onClick={modeOnClickHandler}
              >
                Username
              </div>
              <div
                className={`${styles["mode"]} ${
                  mode === "token" ? styles["active"] : ""
                }`}
                onClick={modeOnClickHandler}
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
                <li className={styles["result"]} key={result.id}>
                  <p className={styles["result-username"]}>{result.username}</p>
                  <IoAdd
                    className={styles["add-icon"]}
                    id={result.id}
                    onClick={addClickHandler}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className={styles["close-button"]}
          onClick={() => props.setAddContact(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddContact;
