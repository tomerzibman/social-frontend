import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SignUpPage = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const doSignUp = async (event) => {
    event.preventDefault();

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
      console.log(error);
    }
  };

  const handleFileUpload = async ({ target }) => {
    const file = target.files[0];
    setPhoto(file);
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "image/jpg"
      ) {
        await previewImage(file);
      } else {
        alert("Please upload a valid PNG or JPEG image.");
      }
    }
  };

  const previewImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        setProfilePicturePreview(reader.result);
        resolve();
      };
    });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Create Account</h2>
          <Form onSubmit={doSignUp} encType="multipart/form-data">
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="mb-0">Username</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label className="mb-0">Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label className="mb-0">Confirm Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProfilePicture">
              <Form.Label className="mb-0">Profile Picture</Form.Label>
              <input
                className="form-control mb-3"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileUpload}
              />
              {profilePicturePreview && (
                <img
                  src={profilePicturePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100px",
                    marginTop: "10px",
                    marginBottom: "13px",
                  }}
                />
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
