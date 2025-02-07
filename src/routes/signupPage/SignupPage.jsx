import { SignUp } from "@clerk/clerk-react";
import React from "react";
import "./signuppage.css";

const SignupPage = () => {
  return (
    <div className="signUppage">
      <SignUp path="/sign-up" signInUrl="sign-in" />
    </div>
  );
};

export default SignupPage;
