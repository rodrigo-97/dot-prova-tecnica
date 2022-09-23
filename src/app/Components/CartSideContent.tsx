import { currencyFormatter } from "../../helpers/currencyFormatter"
import { useCart } from "../../Hooks/useCart"
import { Button } from "./Button"
import { Link } from "./Link"
import { SideMenuTile } from "./Tile"

export function CartSideContent() {
  const { getCartMovies, clearCart, deleteMovie } = useCart()
  const movies = getCartMovies && getCartMovies()

  return (
    <>
      <main className="overflow-y-visible overflow-x-hidden">
        <div className="flex justify-between">
          <p className="text-xl">Meu carrinho</p>
          <Link
            onClick={clearCart}
          >
            Esvaziar
          </Link>
        </div>

        <div className="mt-10 space-y-3">
          {
            movies && movies.map((movie) => {
              return (
                <SideMenuTile
                  key={movie.id}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  price={movie.vote_average ?? 0}
                  title={movie.title ?? "Filme sem título"}
                  trashClick={() => {
                    deleteMovie(movie)
                  }}
                />
              )
            })
          }
        </div>
      </main>

      <div>
        <div className="flex justify-between mb-5">
          <p className="text-xl">Total:</p>
          <p className="text-2xl font-bold">{currencyFormatter(200)}</p>
        </div>
        <Button>
          Finalizar Compra
        </Button>
      </div>
    </>
  )
}