import { BASE_URL, BASE_URL_EVERYTHING, API_KEY } from "./constants";

export const getNews = async () => {
  try {
    const response = await fetch(`${BASE_URL}country=us&apiKey=${API_KEY}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud a la API");
    }

    const data = await response.json();
    return data.articles; //los artículos están en la propiedad 'articles'
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const fetchNews = async (keyword) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // Fecha de los últimos 7 días
  const toDate = new Date(); // Fecha actual

  const url = `${BASE_URL_EVERYTHING}?q=${keyword}&from=${fromDate.toISOString()}&to=${toDate.toISOString()}&pageSize=100&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data.articles; // Devuelve los artículos
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; // Manejar el error en el componente
  }
};
