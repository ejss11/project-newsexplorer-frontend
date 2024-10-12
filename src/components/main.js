import React, { useState } from "react";
import Header from "./header";
import SearchForm from "./SearchForm";
import About from "./About";
import NewsCardList from "./NewsCardList";
import "../blocks/main.css";

function Main({
  onLoginClickPopup,
  isLoggedIn,
  onLoggedOut,
  onSubmit,
  isLoading,
  onDataArticles,
  onArticleClick,
  isUser,
  isSavedArticle,
  savedArticleData,
}) {
  // Estado para controlar si se ha hecho una búsqueda
  const [hasSearched, setHasSearched] = useState(true);

  // Función para manejar el submit del formulario de búsqueda
  const handleSearchSubmit = (query) => {
    setHasSearched(true); // Cambiamos el estado cuando se hace una búsqueda
    onSubmit(query); // Ejecutamos la función onSubmit que pasaste como prop
  };

  return (
    <main className="content">
      <div className="content__header-search">
        <Header
          onLoginClick={onLoginClickPopup}
          isLoggedIn={isLoggedIn}
          onLoggedOut={onLoggedOut}
          isUser={isUser}
        />
        <SearchForm onSearch={handleSearchSubmit} />
      </div>
      {/* Mostrar NewsCardList solo si se ha hecho una búsqueda */}
      {hasSearched && (
        <NewsCardList
          isLoading={isLoading}
          onDataArticles={onDataArticles}
          onArticleClick={onArticleClick}
          isSavedArticle={isSavedArticle}
          savedArticleData={savedArticleData}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
