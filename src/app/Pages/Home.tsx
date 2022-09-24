import { MovieCard } from '../Components/MovieCard'
import { Movie } from '../Models/Movie'

import NotFound from '../../assets/netflix.svg'

type Props = {
  movies: Movie[]
  filteredMovies: Movie[]
  search: string
}

export function Home({ filteredMovies, movies, search }: Props) {
  return (
    <>
      <section
        className='flex flex-wrap justify-center gap-5 mx-10 lg:mx-20 my-5 transition-all ease-in-out duration-300'
      >
        {
          (!!movies && search === "") && movies.map((movie, index) => {
            return (
              <MovieCard
                key={`${movie.id}_${index}`}
                id={movie.id}
                genre_ids={movie.genre_ids}
                title={movie.title}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            )
          })
        }
        {
          (!!filteredMovies && search !== "") && filteredMovies.map((movie, index) => {
            return (
              <MovieCard
                key={`${movie.id}_${index}`}
                id={movie.id}
                genre_ids={movie.genre_ids}
                title={movie.title}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            )
          })
        }
        {
          ((movies.length === 0 && search === "") || (filteredMovies.length === 0 && search !== "")) && (
            <div className='text-center'>
              <img
                src={NotFound}
                className="h-[450px] mb-10"
                alt="Imagem do logo da Netflix representando que não possui nenhum filme listado"
              />
              <p>Não foi encontrado nenhum filme com o termo <b>{search}</b>.</p>
              <p>Tente pesquisar usando um termo diferente.</p>
            </div>
          )
        }
      </section>

      <div id="ward" className='h-20' />
    </>
  )
}