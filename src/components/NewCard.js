import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/NewCard.css";
import iconDelete from "../images/trash.svg";
import iconSaved from "../images/bookmark.svg";
import iconSavedBlue from "../images/bookmark-blue.svg";

function NewsCard({
  articleData,
  onArticleClick,
  onArticleDelete,
  isSavedArticle,
  savedArticleData,
  isLoggedIn,
  savedArticles,
}) {
  const location = useLocation();

  const dateArticle = articleData.publishedAt
    ? articleData.publishedAt
    : articleData.date;

  const imageUrl = articleData.urlToImage
    ? articleData.urlToImage
    : articleData.image;

  const sourceArticle = articleData.source.name
    ? articleData.source.name
    : articleData.source;

  const descriptionArticle = articleData.description
    ? articleData.description
    : articleData.text;

  const date = new Date(dateArticle);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);

  console.log(formattedDate);

  const isSavedNewsPage = location.pathname === "/saved-news";

  const currentUser = useContext(CurrentUserContext);
  const isOwn = articleData.owner === currentUser._id;

  const isArticleSaved =
    Array.isArray(savedArticles) &&
    savedArticles.some((savedArticle) => savedArticle.link === articleData.url);

  const cardDeleteButtonClassName = `card__image-delete ${
    isOwn ? "card__image-delete" : "card__image-delete_hidden"
  }`;

  const cardSavedButtonClassName = `card__image-saved ${
    isOwn ? "card__image-saved" : "card__image-saved_hidden"
  }`;

  const cardsSavedIcon = `${
    isSavedArticle && isArticleSaved ? iconSavedBlue : iconSaved
  }`;

  const handleClick = () => {
    onArticleClick(articleData);
  };

  const handleDeleteClick = (articleId) => {
    onArticleDelete(articleId);
  };

  const handleSaveClick = () => {
    savedArticleData(articleData, currentUser);
  };

  return (
    <li className="card">
      <div className="card__image">
        <img
          className="card__image-photo"
          src={imageUrl}
          alt={articleData.title}
          onClick={handleClick}
        />
        {isOwn && isSavedNewsPage ? (
          <div className="card__image-button_container">
            <div className="card__image-text_overlay">
              <p className="card__image-text_classification">{sourceArticle}</p>
            </div>
            <button
              className="card__image-button"
              onClick={() => handleDeleteClick(articleData._id)}
            >
              <img
                className={cardDeleteButtonClassName}
                src={iconDelete}
                alt="Eliminar Articulo Guardado"
              />
            </button>
            <span className="card__image-tooltip">Eliminar Artículo</span>
          </div>
        ) : isLoggedIn ? (
          <button className="card__image-button" onClick={handleSaveClick}>
            <img
              className={`card__image-saved`}
              src={cardsSavedIcon}
              alt="Guardar Articulo"
            />
          </button>
        ) : (
          <>
            <div className="card__image-button_container">
              <button className="card__image-button" onClick={handleSaveClick}>
                <img
                  className={cardSavedButtonClassName}
                  src={cardsSavedIcon}
                  alt="Guardar Articulo"
                />
              </button>
              <span className="card__image-tooltip">
                Inicia sesión para guardar artículos
              </span>
            </div>
          </>
        )}
      </div>
      <div className="card__content">
        <span className="card__content-date">{formattedDate}</span>
        <h3 className="card__content-title">{articleData.title}</h3>
        <p className="card__content-description">{descriptionArticle}</p>
        <span className="card__content-source">{sourceArticle}</span>
      </div>
    </li>
  );
}

export default NewsCard;
