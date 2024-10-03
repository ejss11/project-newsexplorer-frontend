import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./navigation";

import "../blocks/header.css";

function Header({ onLoginClick, isLoggedIn, onLoggedOut }) {
  const location = useLocation();

  // Verifica si la ruta actual es "/saved-news"
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className="header">
      <div className="header__content">
        <div className={`header__logo`}>
          <Link
            to="/"
            className={`header__link ${
              isSavedNewsPage ? "header_saved-news" : ""
            }`}
          >
            NewsExplorer
          </Link>
        </div>

        <Navigation
          onLoginClick={onLoginClick}
          isLoggedIn={isLoggedIn}
          onLoggedOut={onLoggedOut}
        />
      </div>
      <div
        className={`header__line ${isSavedNewsPage ? "header_saved-news" : ""}`}
      ></div>
    </header>
  );
}

export default Header;
