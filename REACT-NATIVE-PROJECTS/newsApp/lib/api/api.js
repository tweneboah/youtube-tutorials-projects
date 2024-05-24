import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
});

//getNewsByCategory

export async function getNewsByCategory(category) {
  const response = await api.get(
    `/everything?q=${category}&apiKey=74dbbc29322d422a9f084de0e2720076`
  );
  return response.data;
}

//getTopNewsByCountry

export async function getTopNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?country=${country}&apiKey=74dbbc29322d422a9f084de0e2720076`
  );
  return response.data;
}

//searchNews

export async function getNewsByQuery(query) {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=74dbbc29322d422a9f084de0e2720076`
  );
  return response.data;
}
