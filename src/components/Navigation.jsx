import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdOutlineGTranslate, MdOutlineLogout } from "react-icons/md";

import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

function Navigation({ name, logout }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <>
      {logout !== undefined && (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives" discover="none">
                {locale === 'id' ? 'Terarsip' : 'Archived'}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <button className="toggle-locale" type="button" onClick={toggleLocale}>
        <MdOutlineGTranslate />
      </button>

      <button className="toggle-theme" type="button" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>

      {logout !== undefined && (
        <button className="button-logout" type="button" onClick={logout}>
          <MdOutlineLogout /> {name}
        </button>
      )}
    </>
  );
}

Navigation.propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func,
};

export default Navigation;
