import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";
import Preloader from "./Preloader";
import * as auth from "../utils/MainApi";
import { emailPattern } from "../utils/constants";
import "../blocks/popup.css";
import "../blocks/register.css";

function Register({ isOpen, onClose, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordtValid, setIsPasswordValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePass, setErrorMessagePass] = useState("");
  const [errorMessageUser, setErrorMessageUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSuccess(false);

    auth
      .register(email, password, userName)
      .then((res) => {
        if (res._id) {
          setEmail("");
          setPassword("");
          setUserName("");
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);

          //navigate("/signin"); // Redirige a la pantalla de inicio de sesión
        }
      })
      .catch((err) => {
        setErrorMessage("Error en el registro. Intente nuevamente.");
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      //validar email value.includes("@")
      setEmail(value);
      setIsEmailValid(emailPattern.test(value));
      setErrorMessageEmail("Dirección de correo electrónico no válida");
    }
    if (name === "password") {
      setPassword(value);
      setIsPasswordValid(value.length >= 6);
      setErrorMessagePass(
        "La longitud de la contraseña de ser 6 digitos o mayor"
      );
    }
    if (name === "user") {
      setUserName(value);
      setIsUserValid(value.length >= 6);
      setErrorMessageUser(
        "Ingresar un usuario como minino 6 de logintud ej:(NewsEx)"
      );
    }
    setIsFormValid(isEmailValid && isPasswordtValid && isUserValid);
  }

  return (
    <PopupWithForm
      name="register"
      title="Inscribirse"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label-email">Correo electrónico</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Introduce tu correo electrónico"
        className="form__input_register-email"
        required
      />
      {!isEmailValid && (
        <div className="form__error">
          <p className="form__error-message">{errorMessageEmail}</p>
        </div>
      )}
      <label className="form__label-password">Contraseña</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Introduce tu contraseña"
        className="form__input_register-password"
        required
      />
      {!isPasswordtValid && (
        <div className="form__error">
          <p className="form__error-message">{errorMessagePass}</p>
        </div>
      )}
      <label className="form__label-user">Nombre de usuario</label>
      <input
        type="text"
        name="user"
        value={userName}
        onChange={handleInputChange}
        placeholder="Introduce tu nombre de usuario"
        className="form__input_register-user"
        required
      />
      {!isPasswordtValid && (
        <div className="form__error">
          <p className="form__error-message">{errorMessageUser}</p>
        </div>
      )}
      {errorMessage && !isPasswordtValid && (
        <div className="form__error">
          <p className="form__error-message">
            {errorMessage + errorMessageUser}
          </p>
        </div>
      )}

      <button
        type="submit"
        className={`form__submit ${!isFormValid && "form__submit_disabled"}`}
        disabled={!isFormValid}
      >
        {!isLoading ? "Inscribirse" : Preloader()}
      </button>
      {isSuccess && isInfoTooltipOpen && (
        <InfoTooltip
          isOpen={isOpen}
          onClose={handleCloseTooltip}
          isSuccess={isSuccess}
        />
      )}
    </PopupWithForm>
  );
}

export default Register;
