import { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import userService from "../services/user";

import Notification from "./Notification";

const LoginOrSignUp = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  const handleSignUp = async (userObj) => {
    await userService.createUser(userObj);
    setShowSuccess(true);
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
      <Notification
        varient="success"
        message="Account created successfully! Please login"
        open={showSuccess}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default LoginOrSignUp;
