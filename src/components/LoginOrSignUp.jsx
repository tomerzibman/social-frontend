import { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import userService from "../services/user";

const LoginOrSignUp = ({ handleLogin }) => {
  const [signedUp, setSignedUp] = useState(false);

  const toggleForm = () => {
    setSignedUp(!signedUp);
  };

  const handleSignUp = async (userObj) => {
    try {
      await userService.createUser(userObj);
      toggleForm();
    } catch (error) {
      console.log(error);
    }
  };

  const buttonLabel = signedUp
    ? "Click here to create an account"
    : "Click here to login";

  return (
    <div>
      {!signedUp && <SignUpPage handleSignUp={handleSignUp} />}
      {signedUp && <LoginPage handleLogin={handleLogin} />}
      <button onClick={toggleForm}>{buttonLabel}</button>
    </div>
  );
};

export default LoginOrSignUp;
