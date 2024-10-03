import React from "react";
import { Link } from "react-router-dom";
import "../blocks/footer.css";
import IconGitHub from "../images/github.svg";
import IconFace from "../images/fb.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <ul className="footer__link">
        <li>
          <Link to="/" className="footer__link-start">
            Inicio
          </Link>
        </li>
        <li>
          <Link className="footer__link-practicum">Practicum</Link>
        </li>
        <li>
          <Link className="footer__link_social-git">
            <img src={IconGitHub} alt="Repositorio GitHub" />
          </Link>
        </li>
        <li>
          <Link className="footer__link_social-face">
            <img src={IconFace} alt="Mi Faceboock" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
