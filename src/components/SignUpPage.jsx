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

const SignUpPage = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhoto(file);
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const doSignUp = async (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   setValidated(true);
    //   return;
    // }

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
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5vh" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Signup
          </Typography>
          <form onSubmit={doSignUp} encType="multipart/form-data">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
    </Container>
  );
};

export default SignUpPage;
