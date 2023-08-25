import axios from "axios";

export const movieClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
