import React, { useState } from "react";
import "../blocks/search.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setErrorMessage("Por favor, introduzca una palabra clave");
      return;
    }
    setErrorMessage("");
    onSearch(query);
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="search">
      <h1 className="search__title">
        ¿Qué está pasando <br />
        en el mundo?
      </h1>
      <p className="search__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal.
      </p>
      <form onSubmit={handleSubmit} className="search__form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Introduce un tema"
          className="search__input"
        />
        <button type="submit" className="search__button">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
