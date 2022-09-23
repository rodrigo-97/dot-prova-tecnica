import { useCart } from "../../Hooks/useCart"
import { useFavorite } from "../../Hooks/useFavorite"
import { Link } from "./Link"
import { SideMenuTile } from "./Tile"

export function FavoritesSideContent() {
  const { getFavoriteMovies, clearFavorites, deleteMovie } = useFavorite()
  const { addMovie } = useCart()
  const movies = getFavoriteMovies && getFavoriteMovies()

  return (
    <>
      <main className="overflow-y-visible overflow-x-hidden">
        <div className="flex justify-between">
          <p className="text-xl">Meus favoritos</p>
          <Link
            onClick={clearFavorites}
          >
            Esvaziar
          </Link>
        </div>

        <div className="mt-10 space-y-3">
          {
            movies && movies.map((movie) => {
              return (
                <SideMenuTile
                  itsToFavorite={true}
                  key={movie.id}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  price={movie.vote_average ?? 0}
                  title={movie.title ?? "Filme sem título"}
                  trashClick={() => {
                    deleteMovie(movie)
                  }}
                  cartClick={() => {
                    addMovie(movie)
                  }}
                />
              )
            })
          }
        </div>
      </main>
    </>
  )
}