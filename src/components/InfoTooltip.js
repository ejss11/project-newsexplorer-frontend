import React from "react";
import { Link } from "react-router-dom";
import "../blocks/popup.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div
      className={`popup  popup_content_info ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__body">
          <h3 className="popup__title">
            {isSuccess ? "¡El registro se ha completado con éxito!" : null}
          </h3>
          <Link className="popup__link">Inscribirse</Link>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
