import { useEffect, useState } from 'react'
import { Input } from './app/Components/Input'
import { MovieCard } from './app/Components/MovieCard'
import { Navbar } from './app/Components/Navbar'
import { Movie } from './app/Models/Movie'
import { getMovies } from './app/Services/Movies'
import NotFound from './assets/netflix.svg'

function App() {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>([])
  const [search, setSearch] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [page, setPage] = useState(1)
  const [filteredPage, setFilteredPage] = useState(1)

  useEffect(() => {
    const results = getMovies(
      search === "" ? page : filteredPage,
      search || 'a'
    )
      .then(({
        data: {
          results,
        }
      }) => {
        if (search !== "") {
          if (searchFocus) {
            setFilteredMovies(results)
          } else {
            setFilteredMovies([...filteredMovies, ...results])
          }
        } else {
          setMovies([...movies, ...results])
        }
      })

    return () => {
      results
    }
  }, [search, page, filteredPage])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const target = entries[0]

      if (target.isIntersecting) {
        if (searchFocus) {
          setSearchFocus(false)
        }

        setPage(p => p + 1)
        setFilteredPage(p => p + 1)
      }
    })

    intersectionObserver.observe(document.querySelector("#ward")!)

    return () => intersectionObserver.disconnect()
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const target = entries[0]

      if (!target.isIntersecting) {
        setSearchFocus(false)
      } else {
        setSearchFocus(true)
      }
    })

    intersectionObserver.observe(document.querySelector("#navbar")!)

    return () => intersectionObserver.disconnect()
  }, []);

  useEffect(() => {
    if (search === "") {
      setPage(1)
      setFilteredMovies([])
    } else {
      setFilteredPage(1)
      setMovies([])
    }
  }, [search])

  return (
    <div className="App relative">
      <Navbar
        searchInput={
          <Input
            id='search'
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            placeholder="Pesquisa"
          />
        }
      />

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

      <div id="ward" className='h-96' />
    </div>
  )
}

export default App
