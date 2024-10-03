import React, { useState } from "react";
import NewsCard from "./NewCard";
import "../blocks/NewsCardList.css";
import notFound from "../images/not-found_v1.svg";
import Preloader from "./Preloader";

function NewsCardList({ isLoading, onDataArticles, onArticleClick }) {
  // Estado para controlar cuántas tarjetas se muestran
  const [visibleCards, setVisibleCards] = useState(3);

  // Manejar el clic en el botón "Ver más"
  const handleShowMore = () => {
    setVisibleCards(onDataArticles.length);
  };

  // Recortar los artículos mostrados según el estado
  const displayedArticles = onDataArticles.slice(0, visibleCards);
  console.log(onDataArticles);
  return (
    <section className="article">
      {/* Condicional: Si no hay artículos, mostrar mensaje de "No se encontraron resultados" */}

      {isLoading ? (
        <Preloader />
      ) : onDataArticles.length > 0 ? (
        <>
          <h2 className="article__title">Resultados de la búsqueda</h2>
          <ul className="article__content">
            {displayedArticles.map((article) => {
              console.log("Articulo objs: ", article.source);
              return (
                <NewsCard
                  key={article.source.id}
                  articleData={article}
                  onArticleClick={onArticleClick}
                />
              );
            })}
          </ul>
          {visibleCards < onDataArticles.length && (
            <button className="article__more" onClick={handleShowMore}>
              Ver más
            </button>
          )}
        </>
      ) : (
        <div className="article__no_results">
          <img
            className="article__no_results article__no_results-image"
            src={notFound}
            alt="No se encontró nada"
          />
          <h3 className="article__no_results article__no_results-title">
            No se encontró nada
          </h3>
          <p className="article__no_results article__no_results-text">
            Lo sentimos, pero no hay nada que coincida con tus términos de
            búsqueda.
          </p>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
