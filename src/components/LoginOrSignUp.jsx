import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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

  const buttonVariant = signedUp ? "primary" : "secondary";
  const buttonLabel = signedUp ? "Go to sign up" : "Go to log in";

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          {!signedUp ? (
            <SignUpPage handleSignUp={handleSignUp} />
          ) : (
            <LoginPage handleLogin={handleLogin} />
          )}

          <div className="mt-3 text-center">
            <Button
              variant={buttonVariant}
              onClick={toggleForm}
              className="justify-content-left"
            >
              {buttonLabel}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginOrSignUp;
