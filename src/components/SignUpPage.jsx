import { useState } from "react";

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
    <div>
      <form onSubmit={doSignUp}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          confirm password:
          <input
            type="text"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpPage;
