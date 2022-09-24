import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Input } from './app/Components/Input'
import { Navbar } from './app/Components/Navbar'
import { Movie } from './app/Models/Movie'
import { Checkout } from './app/Pages/Checkout'
import { Home } from './app/Pages/Home'
import { getMovies } from './app/Services/Movies'

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

    intersectionObserver.observe(document.querySelector("#ward")! || document.querySelector("#root")!)

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
            icon={MagnifyingGlass}
          />
        }
      />
      <Routes>
        <Route path=''>
          <Route index element={
            <Home
              filteredMovies={filteredMovies}
              movies={movies}
              search={search}
            />}
          />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
