import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../blocks/App.css";
import Main from "./main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import SavedNewsHeader from "./SavedNewsHeader";
import ImagePopup from "./imagePopup";
import { getNews, fetchNews, savedArticle } from "../utils/ThirdPartyApi";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getUserInfo } from "../utils/MainApi";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagenPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSavedArticle, setSavedArticle] = useState(false);
  const [ArticleSaved, setArticlesSaved] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNews();
        setArticles(newsData);
      } catch (error) {
        setError("Lo sentimos, algo ha salido mal durante la solicitud.");
      } finally {
        setIsLoading(false);
      }
    };

    const savedData = localStorage.getItem("newsData");
    if (savedData) {
      setArticles(JSON.parse(savedData));
      setIsLoading(false);
    } else {
      fetchData();
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      fetchNews(searchTerm)
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Lo sentimos, algo ha salido mal durante la solicitud.");
          setIsLoading(false);
        });
    }
  }, [searchTerm]);

  const handleSaveArticle = async (articleData) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Token no disponible. El usuario no está autenticado.");
      return;
    }

    try {
      const savedArticleResponse = await savedArticle(articleData, token);
      setArticlesSaved((prevSaved) => [...prevSaved, savedArticleResponse]);
    } catch (err) {
      console.error("Error al guardar el artículo:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("sesion iniciada");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    window.location.reload();
    navigate("/");
  };

  const handleCloseAllsPopup = () => {
    setIsRegisterOpen(false);
    setIsLoggedIn(false);
    setIsLoginOpen(false);
    setIsImagenPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagenPopupOpen(true);
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* Ruta para la página principal */}
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Main
                  onLoginClickPopup={() => setIsLoginOpen(true)}
                  onSubmit={setSearchTerm}
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  onLoggedOut={handleLogout}
                  onDataArticles={articles}
                  onArticleClick={handleCardClick}
                  isUser={currentUser.name}
                  isSavedArticle={setSavedArticle}
                  savedArticleData={handleSaveArticle}
                />
              </ErrorBoundary>
            }
          />
          {/* Ruta para la página de artículos guardados */}
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                component={SavedNewsHeader}
                isLoggedIn={isLoggedIn}
              >
                <SavedNewsHeader
                  isLoggedIn={isLoggedIn}
                  onLoggedOut={handleLogout}
                  onLoginClick={() => setIsLoginOpen(true)}
                  onArticleClick={handleCardClick}
                ></SavedNewsHeader>
              </ProtectedRoute>
            }
          />
          {/* Rutas públicas para usuarios no autenticados */}
          <Route
            path="/signin"
            element={
              <Login
                isOpen={isLoginOpen}
                onClose={handleCloseAllsPopup}
                onOpenPopupRegister={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                }}
                onSetIsLoggedIn={() => setIsLoggedIn(true)}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                isOpen={isRegisterOpen}
                onClose={handleCloseAllsPopup}
                isLoading={isLoggedIn}
              />
            }
          />
          {/* Redirige cualquier otra ruta a / si no está autenticado */}
          <Route
            path="*"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}></ProtectedRoute>}
          />
        </Routes>
        <Footer />
        {/*Popup Login */}

        <Login
          isOpen={isLoginOpen}
          onClose={handleCloseAllsPopup}
          onOpenPopupRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          onSetIsLoggedIn={(value) => {
            console.log("value", value);
            setIsLoggedIn(value);
          }}
        />

        {/*Popup Register */}
        <Register
          isOpen={isRegisterOpen}
          onClose={handleCloseAllsPopup}
          isLoading={isLoggedIn}
        />
        {/*Popup Open Image */}
        {selectedCard && (
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={handleCloseAllsPopup}
          ></ImagePopup>
        )}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
