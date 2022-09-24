import { Heart, ShoppingCart } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Portrait from '../../assets/streamming.svg'
import { useCart } from "../../Hooks/useCart";
import { CartSideContent } from "./CartSideContent";
import { FavoritesSideContent } from "./FavoritesSideContent";
import { SideMenu } from "./SideMenu";

type Props = {
  searchInput: React.ReactElement
}

export function Navbar({ searchInput }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSideMenu, setCurrentSideMenu] = useState<"favorites" | "cart" | null>(null)
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <div id="navbar" className="bg-[#8DD7CF] min-h-16 py-2 px-5 md:px-20 flex items-center justify-between flex-wrap">
        <img
          src={Portrait}
          alt="Logo com montanhas ao fundo no tom de roxo"
          className="h-[50px] hidden md:block hover:cursor-pointer"
          onClick={() => navigate('')}
        />
        {searchInput}
        <div className="flex space-x-3 mt-5 md:mt-0">
          <Heart
            onClick={() => {
              setCurrentSideMenu("favorites")
              toggle()
            }}
            weight="fill"
            color="white"
            size={25}
            className="hover:cursor-pointer hover:scale-[1.1] transition-all ease-in-out duration-300" />
          <div
            className="relative hover:cursor-pointer hover:scale-[1.1] transition-all ease-in-out duration-300"
            onClick={() => {
              setCurrentSideMenu("cart")
              toggle()
            }}
          >
            <ShoppingCart weight="fill" color="white" size={25} />
            <div className="absolute top-0 right-0 -mt-3 -mr-2 bg-[#FBE192] rounded-full w-5 h-5 flex justify-center items-center text-sm">
              {getCartCount && getCartCount()}
            </div>
          </div>
        </div>

      </div>
      <SideMenu
        isOpen={isOpen}
        toggle={toggle}
      >
        {
          currentSideMenu === "cart" ? (
            <CartSideContent />
          ) : (
            <FavoritesSideContent />
          )
        }
      </SideMenu>
    </>
  )
}
