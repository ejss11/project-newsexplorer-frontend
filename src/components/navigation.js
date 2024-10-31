import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../blocks/navigation.css";
import logout from "../images/Union.svg";
import logoutBlack from "../images/logout.svg";
import menuClose from "../images/closeMovil.svg";
import menuWhite from "../images/menuWhite.svg";
import menuBlack from "../images/menuBlack.svg";
import menuCloseBlack from "../images/Cross.svg";

function Navigation({ onLoginClick, isLoggedIn, onLoggedOut, isUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  console.log(isMenuOpen);

  const onMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  // Verifica si la ruta actual es "/saved-news"
  const isSavedNewsPage = location.pathname === "/saved-news";

  console.log("esta logeado el usuario " + isLoggedIn);
  return (
    <nav className="nav">
      <div className="nav__menu-icon" onClick={onMenuToggle}>
        {/* Alterna entre el icono de menú y cerrar */}
        {isSavedNewsPage ? (
          <img src={isMenuOpen ? menuCloseBlack : menuBlack} alt="Menu icon" />
        ) : (
          <img src={isMenuOpen ? menuClose : menuWhite} alt="Menu icon" />
        )}
      </div>

      {/* Contenedor del menú móvil, solo se muestra cuando isMenuOpen es true */}
      {isMenuOpen && (
        <div className="nav__menu-mobile">
          {isLoggedIn ? (
            <>
              <div className="nav__menu-icon" onClick={onMenuToggle}>
                <div className="nav__menu-icon_header">
                  <h6 className="nav__menu-icon_title">NewsExplorer</h6>
                  {/* Alterna entre el icono de menú y cerrar */}
                  <img
                    className="nav__menu-icon_button"
                    src={isMenuOpen ? menuClose : menuWhite}
                    alt="Menu icon"
                  />
                </div>
              </div>
              <div className="nav__menu-icon_line"></div>
              <Link
                to="/"
                className={`nav__item-mobile ${
                  isSavedNewsPage ? "nav_saved-news" : ""
                }`}
                onClick={onMenuToggle} // Cierra el menú al hacer clic
              >
                Inicio
              </Link>
              <Link
                to="/saved-news"
                className={`nav__item-mobile ${
                  isSavedNewsPage ? "nav_saved-news" : ""
                }`}
                onClick={onMenuToggle} // Cierra el menú al hacer clic
              >
                Artículos guardados
              </Link>

              <button
                className={`nav__button-logout-mobile ${
                  isSavedNewsPage ? "nav_saved-news" : ""
                }`}
                onClick={() => {
                  onLoggedOut();
                  onMenuToggle(); // Cierra el menú tras cerrar sesión
                }}
              >
                {isUser}
                <img
                  className="nav__button-icon-mobile"
                  src={isSavedNewsPage ? logout : logout}
                  alt="Cerrar Sesión"
                />
              </button>
            </>
          ) : (
            <>
              <div className="nav__menu-icon" onClick={onMenuToggle}>
                <div className="nav__menu-icon_header">
                  <h6 className="nav__menu-icon_title">NewsExplorer</h6>
                  {/* Alterna entre el icono de menú y cerrar */}
                  <img
                    className="nav__menu-icon_button"
                    src={isMenuOpen ? menuClose : menuWhite}
                    alt="Menu icon"
                  />
                </div>
              </div>
              <div className="nav__menu-icon_line"></div>
              <Link
                to="/"
                className={`nav__item-mobile ${
                  isSavedNewsPage ? "nav_saved-news" : ""
                }`}
                onClick={onMenuToggle} // Cierra el menú al hacer clic
              >
                Inicio
              </Link>
              <button
                className={`nav__button-signin-mobile ${
                  isSavedNewsPage ? "nav_saved-news" : ""
                }`}
                onClick={() => {
                  onLoginClick();
                  onMenuToggle(); // Cierra el menú tras hacer clic en iniciar sesión
                }}
              >
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      )}

      {/* Mostrar solo si el usuario está logueado */}
      {isLoggedIn ? (
        <>
          <Link
            to="/"
            className={`nav__start ${isSavedNewsPage ? "nav_saved-news" : ""}`}
          >
            Inicio
          </Link>
          <Link
            to="/saved-news"
            className={`nav__two ${isSavedNewsPage ? "nav_saved-news" : ""}`}
          >
            Artículos guardados
          </Link>

          <button
            className={`nav__button-logout ${
              isSavedNewsPage ? "nav_saved-news" : ""
            }`}
            onClick={onLoggedOut}
          >
            {isUser}
            <img
              className="nav__button-icon"
              src={isSavedNewsPage ? logoutBlack : logout}
              alt="Cerrar Sesión"
            />
          </button>
        </>
      ) : (
        <>
          <Link
            to="/"
            className={`nav__start ${isSavedNewsPage ? "nav_saved-news" : ""}`}
          >
            Inicio
          </Link>
          <button
            className={`nav__button-signin ${
              isSavedNewsPage ? "nav_saved-news" : ""
            }`}
            onClick={onLoginClick}
          >
            Iniciar sesión
          </button>
        </>
      )}
    </nav>
  );
}

export default Navigation;
