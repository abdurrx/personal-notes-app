import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { FaSpinner } from "react-icons/fa";

function loading() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className="loading">
      <FaSpinner
        className="loading-spinner"
        style={{ color: theme === "light" ? "#333333" : "#ffffff" }}
      />
    </div>
  );
}

export default loading;
