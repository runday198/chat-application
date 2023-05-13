import AuthButton from "../../components/button/AuthButton";
import AuthCard from "../../components/card/AuthCard";
import Input from "../../components/input/Input";
import { Form, Link } from "react-router-dom";

function Signup() {
  return (
    <AuthCard>
      <h1 className="auth-header">Sign Up</h1>
      <Form className="auth-form" method="post">
        <Input type="email" name="email" id="Email" />
        <Input type="username" name="username" id="Username" />
        <Input type="password" name="password" id="Password" />
        <Input
          type="confirmPassword"
          name="confirmPassword"
          id="Confirm Password"
        />

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
