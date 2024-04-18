import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleUsernameChange = ({ target }) => {
    setInvalid(false);
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setInvalid(false);
    setPassword(target.value);
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
    } catch (error) {
      setInvalid(true);
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={doLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="mb-0">Username</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                isInvalid={invalid}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={invalid}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
