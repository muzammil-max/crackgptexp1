import React from "react";
import "./signinPage.css";
import { SignIn } from "@clerk/clerk-react";

const SigninPage = () => {
  return (
    <div className="signinPage">
      <SignIn
        path="/sign-in"
        signUpUrl="sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SigninPage;
