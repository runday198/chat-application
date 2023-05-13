import AuthButton from "../../components/button/AuthButton";
import AuthCard from "../../components/card/AuthCard";
import Input from "../../components/input/Input";
import { Form, Link, useActionData } from "react-router-dom";
import ResultMessage from "../../components/result/ResultMessage";
import InputContainer from "../../components/input/InputContainer";
import ErrorMessage from "../../components/result/ErrorMessage";

export async function action({ request }) {
  try {
    let formData = await request.formData();
    let email = formData.get("email");
    let username = formData.get("username");
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    let resData = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword,
      }),
    });

    if (resData.status === 400) {
      let res = await resData.json();

      return { ...res, success: false, source: "client" };
    } else if (resData.status === 500) {
      return { success: false, source: "server" };
    } else if (resData.status === 200) {
      return { success: true };
    }
  } catch (err) {
    console.log(err);
    return { success: false, source: "server" };
  }
}

function Signup() {
  var actionData = useActionData();
  var errors;

  if (actionData && actionData.success) {
    return (
      <ResultMessage
        hasSucceded={true}
        message="You were successfully registered, you can log in"
        link="/login"
        linkName="Log In"
      />
    );
  } else if (actionData && actionData.source === "server") {
    return (
      <ResultMessage
        hasSucceded={false}
        message="Operation failed, please try again later"
        link="/login"
        linkName="Log In"
      />
    );
  } else if (actionData) {
    errors = actionData.errors;
  }

  return (
    <AuthCard>
      <h1 className="auth-header">Sign Up</h1>
      <Form className="auth-form" method="post">
        <InputContainer>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="Email" />
          {errors?.email && <ErrorMessage message={errors.email.msg} />}
        </InputContainer>

        <InputContainer>
          <label htmlFor="username">Username</label>
          <Input type="username" name="username" id="username" />
          {errors?.username && <ErrorMessage message={errors.username.msg} />}
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          {errors?.password && <ErrorMessage message={errors.password.msg} />}
        </InputContainer>

        <InputContainer>
          <label htmlFor="confirmPassword">Confirm Password</label>

          <Input type="password" name="confirmPassword" id="confirmPassword" />
          {errors?.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.msg} />
          )}
        </InputContainer>

        <AuthButton type="submit" text="Sign Up" />

        <div className="link-container">
          <Link className="link" to="/login">
            Log In
          </Link>
        </div>
      </Form>
    </AuthCard>
  );
}

export default Signup;
