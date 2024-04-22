import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Notification from "./Notification";

const SignUpPage = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkUsername = (text) => {
    if (!text) {
      setUsernameError("username is required");
      return false;
    } else if (!/^[a-zA-Z0-9]+$/.test(text)) {
      setUsernameError("username consists only of letters and numbers");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
    checkUsername(target.value);
  };

  const checkName = (text) => {
    if (!text) {
      setNameError("name is required");
      return false;
    } else if (!/[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(text)) {
      setNameError("name consists only of letters, numbers, and spaces");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const handleNameChange = ({ target }) => {
    setName(target.value);
    checkName(target.value);
  };

  const checkPassword = (text) => {
    if (!text) {
      setPasswordError("password is required");
      return false;
    } else if (text.length < 5) {
      setPasswordError("password must be at least 5 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
    checkPassword(target.value);
  };

  const checkConfirmPassword = (text) => {
    if (text !== password) {
      setConfirmPasswordError("passwords must match");
      return false;
    } else if (!text) {
      setConfirmPasswordError("confirm password required");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handleConfirmPasswordChange = ({ target }) => {
    setConfirmPassword(target.value);
    checkConfirmPassword(target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhoto(file);
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  const doSignUp = async (event) => {
    event.preventDefault();
    const valid =
      checkUsername(username) &
      checkName(name) &
      checkPassword(password) &
      checkConfirmPassword(confirmPassword);
    if (!valid) {
      setErrorMessage("Signup failed: invalid input");
      setShowError(true);
      return;
    }

    const userFormData = new FormData();
    userFormData.append("username", username);
    userFormData.append("name", name);
    userFormData.append("password", password);
    userFormData.append("confirmPassword", confirmPassword);
    userFormData.append("photo", photo);

    try {
      await handleSignUp(userFormData);
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("Signup failed: ", error);
      if (error.response && error.response.data) {
        const err = error.response.data;
        err.status = error.response.status;
        if (err.status === 400 && err.type === "ajv val") {
          err.error.forEach((error) => {
            const path = error.instancePath.substring(1);
            const message = error.message;
            if (path === "username") {
              setUsernameError(message);
            } else if (path === "name") {
              setNameError(message);
            } else if (path === "password") {
              setPasswordError(message);
            } else {
              setConfirmPasswordError(message);
            }
          });
          setErrorMessage("Signup failed: invalid input");
          setShowError(true);
        } else if (err.status === 400 && err.message === "username taken") {
          setUsernameError("Username taken: choose a different name");
          setErrorMessage("Signup failed: invalid input");
          setShowError(true);
        } else {
          setErrorMessage(
            "An unexpected error occured while creating your account"
          );
          setShowError(true);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5vh" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Signup
          </Typography>
          <form onSubmit={doSignUp} encType="multipart/form-data" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              required
              error={usernameError !== ""}
              helperText={usernameError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
              error={nameError !== ""}
              helperText={nameError}
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
              error={passwordError !== ""}
              helperText={passwordError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError}
            />
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Avatar
              </Button>
            </label>
            {preview && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Avatar
                  src={preview}
                  alt="Avatar Preview"
                  style={{ width: "100px", height: "100px", margin: "auto" }}
                />
              </div>
            )}
            <CardActions
              style={{ justifyContent: "center", marginTop: "1rem" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Signup
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <Notification
        varient="error"
        message={errorMessage}
        open={showError}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default SignUpPage;
