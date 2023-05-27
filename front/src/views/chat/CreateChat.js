import { Form, Link, redirect } from "react-router-dom";
import styles from "./CreateChat.module.css";
import { useActionData } from "react-router-dom";
import ErrorMessage from "../../components/result/ErrorMessage";

export async function action({ request }) {
  var formData = await request.formData();
  var name = formData.get("name");
  try {
    let resData = await fetch("http://localhost:5000/create-chat", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (resData.status === 201) {
      return redirect("/home");
    }
    let res = await resData.json();

    return { error: res.errors.name.msg };
  } catch (err) {
    console.log(err);
    return { error: "Internal Error" };
  }
}

function CreateChat(props) {
  var actionData = useActionData();

  console.log(props.test);

  return (
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1 className={styles["header-text"]}>Create Chat</h1>
        </div>
        <Form className={styles["form"]} method="POST">
          <div className={styles["input-container"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles["name"]}
            />
            {actionData?.error && <ErrorMessage message={actionData.error} />}
          </div>
          <div className={styles["button-container"]}>
            <Link to="/home" className={styles["cancel-button"]}>
              Cancel
            </Link>
            <button type="submit" className={styles["submit-button"]}>
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateChat;
