import React from "react";
import "../blocks/about.css";
import logo from "../images/image-03.png";
function About() {
  return (
    <section className="about">
      <img src={logo} className="about__image" alt="Avatar" />
      <div className="about__content">
        <h2 className="about__content_title">Acerca del autor</h2>
        <p className="about__content_description-one">
          Este bloque describe al autor del proyecto. Aquí debe indicar tu
          nombre, a qué te dedicas y qué tecnologías de desarrollo conoces.
        </p>
        <p className="about__content_description-two">
          También puedes hablar de tu experiencia con Practicum, de lo que
          aprendiste allí y de cómo puedes ayudar a los clientes potenciales.
        </p>
      </div>
    </section>
  );
}

export default About;
