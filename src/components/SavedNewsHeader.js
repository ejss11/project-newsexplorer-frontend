import React, { useState, useEffect, useContext } from "react";
import Header from "./header";
import NewsCard from "./NewCard";
import { getSavedArticles, deleteArticle } from "../utils/ThirdPartyApi";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/SavedNewsHeader.css";

function SavedNewsHeader({
  isLoggedIn,
  onLoggedOut,
  onLoginClick,
  onArticleClick,
  isSavedArticle,
}) {
  const [savedArticles, setSavedArticles] = useState([]);

  const currentUser = useContext(CurrentUserContext);

  const savedArticlesCount = savedArticles.length;

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    getSavedArticles(token)
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [savedArticles]);

  let keywordsDisplay = "";
  let additionalKeywordsCount = 0;

  if (savedArticles.length <= 5) {
    const allkeywords = savedArticles.map((article) => article.keyword);
    keywordsDisplay = allkeywords.slice(0, 2).join(", ");
    additionalKeywordsCount = allkeywords.length - 2;
  }

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("jwt");
    deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        );
        isSavedArticle(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="saved-news">
      <Header
        isUser={currentUser.name}
        onLoginClick={onLoginClick}
        onLoggedOut={onLoggedOut}
        isLoggedIn={isLoggedIn}
      ></Header>
      <div className="saved-news__content">
        <div className="saved-news__content-title">
          <h2 className="saved-news__title">Artículos guardados</h2>
          <h3 className="saved-news__subtitle">
            {currentUser.name} ,tienes {savedArticlesCount} artículos guardados
          </h3>
          <p className="saved-news__keywords">
            Por palabras clave:
            <span className="saved-news__keywords-bold">{keywordsDisplay}</span>
            {additionalKeywordsCount > 0 &&
              `, y ${additionalKeywordsCount} más`}
          </p>
        </div>
        <div className="saved-news__article">
          {savedArticles.length > 0
            ? savedArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  articleData={article}
                  onArticleDelete={handleDeleteArticle}
                  isSavedArticle={isSavedArticle}
                />
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
