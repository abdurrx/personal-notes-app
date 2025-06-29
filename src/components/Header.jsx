import React from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation";

import LocaleContext from "../contexts/LocaleContext";

function Header({ name, logout }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <header>
      <h1>
        <Link to="/" discover="none">
          {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
        </Link>
      </h1>
      <Navigation name={name} logout={logout} />
    </header>
  );
}

export default Header;
