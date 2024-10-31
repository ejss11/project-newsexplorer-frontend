# Proyecto de Noticias - React + API

Este es un proyecto de una aplicación de noticias que permite a los usuarios buscar artículos y guardarlos. Los usuarios pueden registrarse e iniciar sesión para gestionar sus artículos guardados. Se implementan rutas protegidas para usuarios autenticados y se integra una API externa para obtener noticias.

# Tecnologías Utilizadas

Este proyecto está construido con las siguientes tecnologías:

- React: Biblioteca de JavaScript para construir interfaces de usuario.
- React Router: Manejo de las rutas en la aplicación.
- ESLint: Herramienta para identificar y corregir errores en el código JavaScript.
- CSS: Estilización de los componentes.
- JSX: Sintaxis de extensión de JavaScript utilizada en React para definir la estructura de los componentes de la interfaz.
- API personalizada (Back-end): Manejo de autenticación de usuarios y obtención de datos.
- LocalStorage: Almacenamiento temporal de datos en el navegador para mejorar la experiencia de usuario.

# Cómo ejecutar el proyecto

# Requisitos previos

- Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

        - Node.js (versión 12 o superior)
        - npm (Gestor de paquetes que viene con Node.js)
        - Pasos para ejecutar el proyecto
        - Clonar el repositorio

- Abre una terminal y clona este repositorio ejecutando:

        1.- bash
        2.- Copiar código
        3.- git clone https://github.com/ejss11/project-newsexplorer-frontend.git
        4.- Instalar dependencias

- Navega dentro de la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

  1.- bash
  2.- Copiar código
  3.- cd project-newsexplorer-frontend
  4.- npm install
  5.- Configurar las variables de entorno

- Si el proyecto depende de variables de entorno, crea un archivo .env en la raíz del proyecto con la configuración necesaria para conectarse a la API de tu back-end:

  1.- env
  2.- Copiar código
  3.- REACT_APP_API_URL=https://api.eduardo.desarrollointerno.com/
  4.- Ejecutar el proyecto

- Para ejecutar el proyecto en modo de desarrollo, ejecuta el siguiente comando:

  1.- bash
  2.- Copiar código
  3.- npm start
  4.- Luego, abre tu navegador y visita http://localhost:3000 para ver la aplicación en funcionamiento.

# Acceso a la página

- Para acceder a la página y probar las rutas protegidas, utiliza las siguientes credenciales de acceso:

Email: test@example.com
Password: 123456
Estos credenciales se pueden utilizar para iniciar sesión en la aplicación. Si necesitas crear nuevas cuentas, puedes usar la funcionalidad de registro.

# Estructura del proyecto

- La estructura principal del proyecto es la siguiente:

bash
Copiar código
src/
│
├── components/ # Componentes principales de la interfaz de usuario
│ ├── App.js # Componente raíz de la aplicación
│ ├── Login.js # Componente de inicio de sesión
│ ├── Register.js # Componente de registro de usuarios
│ └── ... # Otros componentes relacionados
│
├── utils/ # Utilidades, incluida la integración con la API
│ └── MainApi.js # Solicitudes al back-end
│
├── contexts/ # Contextos de React para compartir datos entre componentes
├── blocks/ # Archivos de estilos (CSS)
├── App.css # Estilos principales de la aplicación
└── index.js # Archivo de entrada principal

# Funcionalidades del proyecto

- Registro y Autenticación: Los usuarios pueden registrarse en la aplicación e iniciar sesión para acceder a las rutas protegidas.
- Protección de rutas: Algunas rutas están protegidas y solo son accesibles para los usuarios autenticados.
- Búsqueda de noticias: Los usuarios pueden buscar noticias relacionadas con una palabra clave utilizando una API externa.
- Guardado de artículos: Los usuarios autenticados pueden guardar artículos en su lista personal.
- Manejo de Popups: Interacción con ventanas emergentes para registro, inicio de sesión y detalles de artículos.

# Comentarios sobre el proyecto

Este proyecto fue diseñado para poner en práctica el uso de React, junto con la integración de una API personalizada para la autenticación y una API de terceros para la obtención de noticias. El objetivo principal es mejorar la gestión de estado en aplicaciones React y trabajar con rutas protegidas.
