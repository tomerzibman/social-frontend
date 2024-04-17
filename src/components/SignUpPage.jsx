import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SignUpPage = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doSignUp = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      name,
      password,
      confirmPassword,
    };
    try {
      await handleSignUp(userData);
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Create Account</h2>
          <Form onSubmit={doSignUp}>
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
