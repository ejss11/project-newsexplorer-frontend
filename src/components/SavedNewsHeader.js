import React from "react";
import Header from "./header";
import NewsCard from "./NewCard";
import "../blocks/SavedNewsHeader.css";

function SavedNewsHeader({
  userName = "Eduardo Silva",
  keywords = ["Naturaleza", "Yellowstone", "Musica"],
  isLoggedIn,
  onLoggedOut,
  onLoginClick,
  onDataArticles,
  onArticleClick,
}) {
  const savedArticlesCount = 5; //cantidad de noticias que puede guardar el usuario
  const keywordsDisplay = keywords.slice(0, 2).join(", "); // Muestra las dos primeras palabras clave
  const additionalKeywordsCount = keywords.length - 2; // Muestra cuántas palabras clave más hay

  return (
    <section className="saved-news">
      <Header
        onLoginClick={onLoginClick}
        onLoggedOut={onLoggedOut}
        isLoggedIn={isLoggedIn}
      ></Header>
      <div className="saved-news__content">
        <div className="saved-news__content-title">
          <h2 className="saved-news__title">Artículos guardados</h2>
          <h3 className="saved-news__subtitle">
            {userName} ,tienes {savedArticlesCount} artículos guardados
          </h3>
          <p className="saved-news__keywords">
            Por palabras clave:
            <span className="saved-news__keywords-bold">{keywordsDisplay}</span>
            {additionalKeywordsCount > 0 &&
              `, y ${additionalKeywordsCount} más`}
          </p>
        </div>
        <div className="saved-news__article">
          {onDataArticles.map((article) => (
            <NewsCard
              key={article.source.id}
              articleData={article}
              onArticleClick={onArticleClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
