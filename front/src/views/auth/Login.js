import AuthCard from "../../components/card/AuthCard";
import Input from "../../components/input/Input";

import { Form, Link, redirect, useActionData } from "react-router-dom";
import AuthButton from "../../components/button/AuthButton";
import InputContainer from "../../components/input/InputContainer";
import ResultMessage from "../../components/result/ResultMessage";
import ErrorMessage from "../../components/result/ErrorMessage";

export async function action({ request }) {
  try {
    let formData = await request.formData();

    let email = formData.get("email");
    let password = formData.get("password");

    let resData = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (resData.status === 400) {
      let res = await resData.json();
      return { ...res, source: "client" };
    } else if (resData.status === 200) {
      return redirect("/home");
    } else {
      return { source: "server" };
    }
  } catch (err) {
    console.log(err);
    return { source: "server" };
  }
}

function Login() {
  var actionData = useActionData();
  var errors;

  if (actionData && actionData.source === "client") {
    errors = actionData.errors;
  } else if (actionData && actionData.source === "server") {
    return (
      <ResultMessage
        hasSucceded={false}
        message="Operation failed, please try again later"
        link="/login"
        linkName="Log In"
      />
    );
  }

  return (
    <AuthCard>
      <h1 className="auth-header">Log In</h1>
      <Form className="auth-form" method="post">
        <InputContainer>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" />
          {errors?.email && <ErrorMessage message={errors.email.msg} />}
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
        </InputContainer>

        <AuthButton type="submit" text="Log In" />
        <div className="link-container">
          <Link className="link" to="/signup">
            Create Account
          </Link>
        </div>
      </Form>
    </AuthCard>
  );
}

export default Login;
