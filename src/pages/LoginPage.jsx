import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import LoginInput from "../components/LoginInput";

import LocaleContext from "../contexts/LocaleContext";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLoginHandler({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Yuk, login untuk menggunakan aplikasi."
          : "Login to use app, please."}
      </h2>
      <LoginInput login={onLoginHandler} />
      <p>
        {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}
        <Link to="/register" discover="none">
          &nbsp;{locale === "id" ? "Daftar di sini" : "Register here"}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
