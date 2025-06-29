import React from "react";
import PropTypes from "prop-types";

import useInput from "../hooks/useInput";

function RegisterInput({ register }) {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  async function onSubmitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and password confirm must be same.");
      return;
    }

    register({ name, email, password });
  }

  return (
    <div className="input-register">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={setName} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={setEmail} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={setPassword}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <button type="button" onClick={onSubmitHandler}>
        Register
      </button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
