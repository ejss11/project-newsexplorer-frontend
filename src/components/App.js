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

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagenPopupOpen] = useState(false);

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

  const handleLogin = (email, password) => {
    //setIsLoginOpen(true);
    // Aquí validas las credenciales con una solicitud al servidor
    if (email === "demo@demo.com" && password === "password123") {
      //setIsLoggedIn(true); // Autenticación exitosa
      setIsLoginOpen(false); // Cierra el modal
    } else {
      setIsLoggedIn(false);
      console.error("Credenciales incorrectas");
    }
  };

  // Manejar el envío del formulario de búsqueda
  /* const handleSearch = (searchTerm) => {
    // Simulación de llamada a API o búsqueda
    setTimeout(() => {
      setIsLoading(false); // Detiene el loader después de 2 segundos
      // Aquí deberías hacer la búsqueda real y actualizar el estado de resultados.
    }, 2000);
  }; */

  const handleRegister = () => {
    //setIsSuccess(true);
    //setIsInfoTooltipOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false); // Maneja el cierre de sesión
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

  return (
    <>
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
            <SavedNewsHeader
              isLoggedIn={isLoggedIn}
              onLoggedOut={handleLogout}
              onLoginClick={() => setIsLoginOpen(true)}
              onDataArticles={articles}
              onArticleClick={handleCardClick}
            ></SavedNewsHeader>
          }
        />
        {/* Redirige cualquier otra ruta a / si no está autenticado */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/saved-news" : "/"} />}
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
        onLogin={handleLogin}
      />

      {/*Popup Register */}
      <Register
        isOpen={isRegisterOpen}
        onClose={handleCloseAllsPopup}
        isLoading={isLoggedIn}
        onRegister={handleRegister}
      />
      {/*Popup Open Image */}
      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllsPopup}
        ></ImagePopup>
      )}
    </>
  );
}

export default App;
