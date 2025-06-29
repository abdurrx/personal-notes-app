import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import ArchivePage from "../pages/ArchivePage";
import NotFoundPage from "../pages/NotFoundPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import { LocaleProvider } from "../contexts/LocaleContext";
import { ThemeProvider } from "../contexts/ThemeContext";

import { getUserLogged, putAccessToken } from "../utils/network-data";

function NoteApp() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem("locale") || "id";
  });

  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
        setInitializing(false);
      } catch (err) {
        setAuthedUser(null);
        setInitializing(true);
      }
    };

    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.body.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  if (initializing) return null;

  if (authedUser === null) {
    return (
      <ThemeProvider value={themeContextValue}>
        <LocaleProvider value={localeContextValue}>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={themeContextValue}>
      <LocaleProvider value={localeContextValue}>
        <div className="app-container">
          <Header name={authedUser.name} logout={onLogout} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default NoteApp;
