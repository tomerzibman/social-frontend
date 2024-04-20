import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Notification from "./Notification";

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = ({ target }) => {
    setInvalid(false);
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setInvalid(false);
    setPassword(target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  const doLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username,
        password,
      };
      await handleLogin(credentials);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setInvalid(true);
      setShowError(true);
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5vh" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={doLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {invalid && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                gutterBottom
              >
                username or password incorrect
              </Typography>
            )}
            <CardActions style={{ justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <Notification
        varient="error"
        message="Failed to login, unaithorized"
        open={showError}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default LoginPage;
