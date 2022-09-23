
import { Heart, Popcorn, Star } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { currencyFormatter } from '../../helpers/currencyFormatter'
import { useCart } from '../../Hooks/useCart'
import { useFavorite } from '../../Hooks/useFavorite'
import { Genre } from '../Models/Genre'
import { Movie } from '../Models/Movie'
import { getGenres } from '../Services/Movies'
import { Button } from './Button'

export function MovieCard(movie: Movie) {
  const { genre_ids, title, vote_average, poster_path } = movie
  const [genres, setGenres] = useState<Genre[]>([])
  const { addMovie } = useCart()
  const { addMovie: addMovieToFavorite, getFavoriteMovies, deleteMovie } = useFavorite()

  useEffect(() => {
    const genre = getGenres()
      .then(({ data: { genres: apiGenres } }) => {
        const genres: Genre[] = apiGenres
        const movieGenres = genres.filter((genre) => genre_ids?.includes(genre.id))
        const a = genres.filter((e) => genre_ids?.includes(e.id))
        setGenres(movieGenres)
      })

    return () => {
      genre
    }
  }, [])

  const isfavorite = getFavoriteMovies && getFavoriteMovies().some((favoriteMovie) => favoriteMovie.id === movie.id)

  return (
    <div
      className='w-full sm:w-[250px] max-w-[500px] rounded-md hover:scale-[1.02] transition-all duration-300 border border-[#dfdfdf] flex flex-col justify-between'
    >
      <div className='rounded-t-md relative'>
        {
          poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Capa do filme ${title}`}
              className='object-fill rounded-t-md min-h-[372px]'
            />
          ) : (
            <div className='flex flex-col items-center justify-center min-h-[372px]'>
              <Popcorn
                size={100}
              />
              <p>Imagem não encontrada</p>
            </div>
          )
        }
        <Heart
          size={22}
          weight={isfavorite ? 'fill' : 'duotone'}
          className="absolute top-2 right-2 hover:cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300"
          color='#fc7474'
          onClick={() => {
            isfavorite ? deleteMovie(movie) : addMovieToFavorite(movie)
          }}
        />
      </div>
      <div className='p-4 space-y-2'>
        <p className='text-lg font-bold text-center truncate hover:cursor-pointer' title={title}>{title}</p>
        <div className='flex justify-center items-center space-x-2'>
          <div className='flex items-center space-x-2'>
            <Star size={25} weight="fill" />
            <p>{vote_average}</p>
          </div>
          {
            !!genres && (
              <>
                <p>
                  {
                    genres[0]?.name
                  }
                </p>
                {
                  genres.length > 1 && (
                    <p className='hover:cursor-pointer' title={genres.map(genre => genre.name).join(", ")}>
                      ...
                    </p>
                  )
                }
              </>
            )
          }
        </div>
        <p className='text-center'>{currencyFormatter(vote_average ?? 0)}</p>
      </div>
      <Button
        onClick={() => {
          addMovie(movie)
        }}
      >
        Adicionar
      </Button>
    </div>
  )
}