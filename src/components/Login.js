import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { authorize } from "../utils/MainApi";
import { emailPattern } from "../utils/constants";
import "../blocks/popup.css";
import "../blocks/login.css";

function Login({ isOpen, onClose, onOpenPopupRegister, onSetIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordtValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePass, setErrorMessagePass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      authorize(email, password)
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          onSetIsLoggedIn(true);
          onClose();
        })
        .catch((err) => {
          setErrorMessage(
            "Error de inicio de sesión, por favor verifica tus credenciales. " +
              err
          );
        });
    } else {
      if (!email) setIsEmailValid(false);
      if (!password) setIsPasswordValid(false);
    }
  }

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
    setIsFormValid(isEmailValid && isPasswordtValid);
  }

  return (
    <PopupWithForm
      name="login"
      title="Iniciar sesión"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>{errorMessage}</div>
      <label className="form__label-email">Correo electrónico</label>
      <input
        type="email"
        name="email"
        placeholder="Introduce tu correo electrónico"
        value={email}
        onChange={handleInputChange}
        className={`form__input_login-email ${
          !isEmailValid && "form__input_has_error"
        }`}
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
        placeholder="Introduce tu contraseña"
        value={password}
        onChange={handleInputChange}
        className={`form__input_login-password ${
          !isPasswordtValid && "form__input_has_error"
        }`}
        required
      />
      {!isPasswordtValid && (
        <div className="form__error">
          <p className="form__error-message">{errorMessagePass}</p>
        </div>
      )}

      <button
        type="submit"
        className={`form__submit ${!isFormValid && "form__submit_disabled"}`}
        disabled={!isFormValid}
      >
        Inicia sesión
      </button>
      <div className="login__signup">
        <p>
          o{" "}
          <button className="login__signup-link" onClick={onOpenPopupRegister}>
            inscribirse
          </button>
        </p>
      </div>
    </PopupWithForm>
  );
}

export default Login;
