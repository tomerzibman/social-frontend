import { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import userService from "../services/user";

const LoginOrSignUp = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUp = async (userObj) => {
    await userService.createUser(userObj);
    toggleAuth();
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5vh" }}>
      {isLogin ? (
        <LoginPage handleLogin={handleLogin} />
      ) : (
        <SignUpPage handleSignUp={handleSignUp} />
      )}
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={toggleAuth} color="primary">
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginOrSignUp;
