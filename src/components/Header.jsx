import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="header-link">Movie Review Hub</Link>
      </h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
