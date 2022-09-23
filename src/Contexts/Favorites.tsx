import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Movie } from "../app/Models/Movie";

type Props = {
  children: React.ReactNode
}

type ContextProps = {
  clearFavorites: () => void
  addMovie: (movie: Movie) => void
  deleteMovie: (movie: Movie) => void
  getFavoriteMovies: () => Movie[]
}

export const FavoriteContext = createContext<ContextProps>({} as ContextProps)

export function FavoritesProvider({ children }: Props) {
  const [movies, setMovies] = useState<Movie[]>(JSON.parse(localStorage.getItem("APP_FAVORITES") ?? "[]") as Movie[] ?? [])

  function clearFavorites() {
    if (getCartCount() >= 1) {
      setMovies([])
      toast.success("Favoritos esvaziado!")
    }
  }

  function getCartCount() {
    return movies.length
  }

  function addMovie(movie: Movie) {
    if (!movies.some((currentMovie) => currentMovie.id === movie.id)) {
      setMovies([...movies, movie])
      toast.success("Filme adicionado aos favoritos!")
    } else {
      toast.info(`O filme "${movie.title}" já está nos seus favoritos!`)
    }
  }

  function deleteMovie(movie: Movie) {
    movies.splice(movies.indexOf(movie), 1)
    setMovies([...movies])
    toast.success("Filme removido dos favoritos!")
  }

  function getFavoriteMovies() {
    return movies
  }

  function saveInLocalStorage() {
    localStorage.setItem("APP_FAVORITES", JSON.stringify(movies))
  }

  useMemo(() => {
    saveInLocalStorage()
  }, [movies])

  return (
    <FavoriteContext.Provider value={{
      addMovie,
      clearFavorites,
      deleteMovie,
      getFavoriteMovies,
    }}>
      {children}
    </FavoriteContext.Provider>
  )
}