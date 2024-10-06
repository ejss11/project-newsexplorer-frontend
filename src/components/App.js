import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../blocks/App.css";
import Main from "./main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import SavedNewsHeader from "./SavedNewsHeader";
import ImagePopup from "./imagePopup";
import { getNews, fetchNews } from "../utils/ThirdPartyApi";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getUserInfo } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

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
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true); // Inicia el loader
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

  // almacenar los datos en el localStorage y leerlos cuando el usuario vuelve a la página
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("articles"));
    if (savedArticles) {
      setArticles(savedArticles);
    }
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem("articles", JSON.stringify(articles));
    }
  }, [articles]);

  if (error) {
    return <div>{error}</div>;
  }
  // Obtener el usuario y su token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }, []);
  // Cerrar la Sesion...
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false); // Maneja el cierre de sesión
    window.location.reload(); // Recargar la página para actualizar el estado
    navigate("/");
  };
  // Cerrar todos los Popup...
  const handleCloseAllsPopup = () => {
    setIsRegisterOpen(false);
    setIsLoggedIn(false);
    setIsLoginOpen(false);
    setIsImagenPopupOpen(false);
  };
  // Funcion para abrir la imagen del Articulo
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagenPopupOpen(true);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* Ruta para la página principal */}
          <Route
            path="/"
            element={
              <Main
                onLoginClickPopup={() => setIsLoginOpen(true)}
                onSubmit={setSearchTerm}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                onLoggedOut={handleLogout}
                onDataArticles={articles}
                onArticleClick={handleCardClick}
              />
            }
          />
          {/* Ruta para la página de artículos guardados */}
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNewsHeader
                  userName={currentUser}
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
            path="/protected"
            element={
              <ProtectedRoute
                component={ProtectedComponent}
                isLoggedIn={isLoggedIn}
              />
            }
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
