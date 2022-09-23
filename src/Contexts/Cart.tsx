import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Movie } from "../app/Models/Movie";

type Props = {
  children: React.ReactNode
}

type ContextProps = {
  clearCart: () => void
  addMovie: (movie: Movie) => void
  deleteMovie: (movie: Movie) => void
  getSubtotal: () => number
  getCartMovies: () => Movie[]
  getCartCount: () => number
}

export const CartContext = createContext<ContextProps>({} as ContextProps)

export function CartProvider({ children }: Props) {
  const [movies, setMovies] = useState<Movie[]>(JSON.parse(localStorage.getItem("APP_CART") ?? "[]") as Movie[] ?? [])

  function clearCart() {
    if (getCartCount() >= 1) {
      setMovies([])
      toast.success("Carrinho esvaziado!")
    }
  }

  function getCartCount() {
    return movies.length
  }

  function addMovie(movie: Movie) {
    if (!movies.some((currentMovie) => currentMovie.id === movie.id)) {
      setMovies([...movies, movie])
      toast.success("Filme adicionado ao carrinho!")
    } else {
      toast.info(`O filme "${movie.title}" já está no seu carrinho!`)
    }
  }

  function deleteMovie(movie: Movie) {
    movies.splice(movies.indexOf(movie), 1)
    setMovies([...movies])
    toast.success("Filme removido do carrinho!")
  }

  function getSubtotal() {
    const moviePrices = movies.map((movie) => movie.vote_average)
    const subTotal = moviePrices && moviePrices.reduce((current, previous) => Number(current) + Number(previous), 0)
    return subTotal ?? 0
  }

  function getCartMovies() {
    return movies
  }

  function saveInLocalStorage() {
    localStorage.setItem("APP_CART", JSON.stringify(movies))

  }

  useMemo(() => {
    saveInLocalStorage()
  }, [movies])

  return (
    <CartContext.Provider value={{
      addMovie,
      clearCart,
      deleteMovie,
      getCartMovies,
      getSubtotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}