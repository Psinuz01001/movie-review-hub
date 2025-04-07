import React from "react";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <header className="app-header">
      <div className="header-main">
        <h1 className="logo">
          <Link to="/" className="service-logo">PSIflix</Link>
        </h1>
        <Link to="/favorites" className="favorites-btn">
          My Watchlist
        </Link>
      </div>
    </header>
  );
};

export default Header;
