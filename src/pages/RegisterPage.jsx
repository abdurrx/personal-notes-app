import React from "react";
import { Link, useNavigate } from "react-router-dom";

import RegisterInput from "../components/RegisterInput";

import LocaleContext from "../contexts/LocaleContext";
import { register } from "../utils/network-data";

function RegisterPage() {
  const { locale } = React.useContext(LocaleContext);

  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error, data } = await register(user);

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === "id"
          ? "Isi form untuk mendaftar akun."
          : "Fill the form to register an account."}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}
        <Link to="/login" discover="none">
          &nbsp;{locale === "id" ? "Login di sini" : "Login here"}
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
