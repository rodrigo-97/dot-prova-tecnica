import axios from "axios";

export const Api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '2c72a6f297710e25241427e40980aff6',
    language: 'pt-BR'
  }
})
