// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="header-link">
          Movie Review Hub
        </Link>
      </h1>
    </header>
  );
};

export default Header;
