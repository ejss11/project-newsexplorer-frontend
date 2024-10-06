import React, { useState, useEffect } from "react";
import Header from "./header";
import NewsCard from "./NewCard";
import { getSavedArticles, deleteArticle } from "../utils/ThirdPartyApi";
import "../blocks/SavedNewsHeader.css";

function SavedNewsHeader({
  userName = "Eduardo Silva",
  keywords = ["Naturaleza", "Yellowstone", "Musica"],
  isLoggedIn,
  onLoggedOut,
  onLoginClick,
  onArticleClick,
}) {
  const [savedArticles, setSavedArticles] = useState([]);

  const savedArticlesCount = 5; //cantidad de noticias que puede guardar el usuario
  const keywordsDisplay = keywords.slice(0, 2).join(", "); // Muestra las dos primeras palabras clave
  const additionalKeywordsCount = keywords.length - 2; // Muestra cuántas palabras clave más hay

  useEffect(() => {
    const token = localStorage.getItem("token");
    getSavedArticles(token)
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("token");
    deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          {savedArticles.map((article) => (
            <NewsCard
              key={article.source}
              articleData={article}
              onArticleClick={onArticleClick}
              onArticleDelete={handleDeleteArticle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
