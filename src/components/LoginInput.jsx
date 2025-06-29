import React from "react";
import PropTypes from "prop-types";

import useInput from "../hooks/useInput";

function LoginInput({ login }) {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={setEmail} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={setPassword}
      />
      <button type="button" onClick={onSubmitHandler}>
        Login
      </button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
