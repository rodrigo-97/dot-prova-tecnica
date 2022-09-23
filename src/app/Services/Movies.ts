import { Api } from "./Api"

export async function getMovies(page: number, query?: string) {
  try {
    return Api.get('/search/movie', {
      params: {
        api_key: '2c72a6f297710e25241427e40980aff6',
        language: 'pt-BR',
        page,
        query
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getGenres() {
  try {
    return Api.get('/genre/movie/list')
  } catch (error) {
    return Promise.reject(error)
  }
}
