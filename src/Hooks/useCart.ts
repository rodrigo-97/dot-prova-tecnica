import { useContext } from "react";
import { CartContext } from "../Contexts/Cart";

export function useCart() {
  return useContext(CartContext)
}