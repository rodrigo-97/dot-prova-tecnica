import { useContext } from "react";
import { FavoriteContext } from "../Contexts/Favorites";

export function useFavorite() {
  return useContext(FavoriteContext)
}