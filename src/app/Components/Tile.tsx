import { ShoppingCart, Trash } from "phosphor-react"
import { currencyFormatter } from "../../helpers/currencyFormatter"

type Props = {
  imageUrl: string
  title: string
  price: number
  trashClick: () => void
  cartClick?: () => void
  itsToFavorite?: boolean
}

export function SideMenuTile({ imageUrl, price, title, itsToFavorite, trashClick, cartClick }: Props) {
  return (
    <div
      title={title}
      className="flex justify-between items-center hover:cursor-pointer hover:translate-x-1 transition-all ease-in-out duration-300"
    >
      <img src={imageUrl} alt={`Imagem do filme ${title}`} className="w-12 h-12 object-contain rounded-sm" />
      <p className="truncate text-xs text-left flex-grow">
        {title.length > 20 ? title.substring(0, 14).concat("...") : title}
      </p>
      <p className="px-5">1</p>
      <p className="px-5">{currencyFormatter(price)}</p>
      {
        itsToFavorite && (
          <ShoppingCart
            size={20}
            onClick={cartClick}
            className="mx-2 hover:cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300"
          />
        )
      }
      <Trash
        size={20}
        onClick={trashClick}
        className='hover:cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300 mr-2'
      />
    </div>
  )
}