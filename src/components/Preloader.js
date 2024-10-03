import React from "react";
import "../blocks/preloader.css"; // El archivo CSS para estilos

function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__spinner">
        <i className="preloader__circle"></i>
      </div>
      <span className="preloader__title">Buscando noticias...</span>
    </section>
  );
}

export default Preloader;
