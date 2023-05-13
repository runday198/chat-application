import AuthCard from "../../components/card/AuthCard";
import Input from "../../components/input/Input";

import { Form, Link } from "react-router-dom";
import AuthButton from "../../components/button/AuthButton";
import InputContainer from "../../components/input/InputContainer";

function Login() {
  return (
    <AuthCard>
      <h1 className="auth-header">Log In</h1>
      <Form className="auth-form" method="post">
        <InputContainer>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" />
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
