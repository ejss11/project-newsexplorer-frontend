import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/NewCard.css";
import iconDelete from "../images/trash.svg";
import iconSaved from "../images/bookmark.svg";
import iconSavedBlue from "../images/bookmark-blue.svg";

function NewsCard({ articleData, onArticleClick, onArticleDelete }) {
  const location = useLocation();

  const dateArticle = articleData.publishedAt
    ? articleData.publishedAt
    : articleData.dare;

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

  console.log(formattedDate); // "1 de octubre de 2024"

  // Verifica si la ruta actual es "/saved-news"
  const isSavedNewsPage = location.pathname === "/saved-news";
  const [isSavedArticle, setSavedArticle] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const isOwn =
    articleData.owner && currentUser && articleData.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__image-delete ${
    isOwn ? "card__image-delete" : "card__image-delete_hidden"
  }`;

  const cardSavedButtonClassName = `card__image-saved ${
    isOwn ? "card__image-saved" : "card__image-saved_hidden"
  }`;

  const cardsSavedIcon = `${isSavedArticle ? iconSavedBlue : iconSaved}`;

  //cuando haga click en el articulo
  const handleClick = () => {
    onArticleClick(articleData);
  };

  //cuando haga click en guardar articulo
  const handleSavedClick = () => {
    setSavedArticle(true);
    onArticleClick(articleData);
  };

  const handleDeleteClick = () => {
    onArticleDelete(articleData._id);
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
            <button className="card__image-button" onClick={handleDeleteClick}>
              <img
                className={cardDeleteButtonClassName}
                src={iconDelete}
                alt="Eliminar Articulo Guardado"
              />
            </button>
            <span class="card__image-tooltip">Eliminar Artículo</span>
          </div>
        ) : isOwn ? (
          <button className="card__image-button" onClick={handleSavedClick}>
            <img
              className={cardSavedButtonClassName}
              src={cardsSavedIcon}
              alt="Guardar Articulo"
            />
          </button>
        ) : (
          <>
            <div className="card__image-button_container">
              <button
                className="card__image-button"
                onClick={handleDeleteClick}
              >
                <img
                  className={cardSavedButtonClassName}
                  src={iconSaved}
                  alt="Guardar Articulo"
                />
              </button>
              <span class="card__image-tooltip">
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
