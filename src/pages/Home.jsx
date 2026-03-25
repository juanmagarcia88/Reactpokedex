import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonModal } from '../components/PokemonModal'
import { Pagination } from '../components/Pagination'
import './Home.css'

export default function Home() {

    const [allPokemon, setAllPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [pokemonList, setPokemonList] = useState([])
    const [totalPokemon, setTotalPokemon] = useState(0)
    const [type, setType] = useState("")
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favorites")
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })
    const [showFavs, setShowFavs] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    const totalPages = Math.ceil(totalPokemon / 40)

    const displayPokemon = showFavs ? favorites : allPokemon

    const isFiltering = search || type

    const toggleFavorite = (pokemon) => {
        if (favorites.find(f => f.id === pokemon.id)) {
            setFavorites(favorites.filter(f => f.id !== pokemon.id))
        } else {
            setFavorites([...favorites, pokemon])
        }
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        const fetchNames = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
            const data = await res.json()
            setPokemonList(data.results)
        }
        fetchNames()
    }, [])

    useEffect(() => {

        const fetchPokemon = async () => {

            setLoading(true)

            try {

                if (search || type) {

                    let filtered = pokemonList

                    if (search) {
                        filtered = filtered.filter(p =>
                            p.name.toLowerCase().includes(search.toLowerCase())
                        )
                    }

                    const results = await Promise.all(
                        filtered.map(async (p) => {
                            const res = await fetch(p.url)
                            const data = await res.json()
                            return data
                        })
                    )

                    const filteredByType = results.filter(data =>
                        !type || data.types.some(t => t.type.name === type)
                    )

                    setAllPokemon(filteredByType)

                    return
                }

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${page * 40}`
                )

                const data = await response.json()

                const pokemonArray = await Promise.all(
                    data.results.map(async (poke) => {
                        const res = await fetch(poke.url)
                        return res.json()
                    })
                )

                setAllPokemon(pokemonArray)
                setTotalPokemon(data.count)

            } catch (error) {
                console.error("Error fetching Pokemon", error)
            } finally {
                setLoading(false)
            }

        }

        fetchPokemon()

    }, [page, search, pokemonList, type])

    return (
        <main>
            <div className="top-bar">
                <Link to="/">
                    <div className='home-landing-h1'>
                        <h1 className='home-react'>React</h1>
                        <h1 className='home-pokedex'>Pokedex</h1>
                    </div>
                </Link>

                <div className='filters'>
                    <label className="searcher">
                        Search pokemon by name:
                        <input onChange={(e) => setSearch(e.target.value)} id="searcher" type="text" />
                    </label>
                    <select className='types' onChange={(e) => setType(e.target.value)}>
                        <option value="">All types</option>
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="ice">Ice</option>
                        <option value="fighting">Fighting</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="flying">Flying</option>
                        <option value="psychic">Psychic</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="steel">Steel</option>
                        <option value="fairy">Fairy</option>
                    </select>
                </div>

                <div>
                    <h2 className='favorites-h2' onClick={() => setShowFavs(!showFavs)}>
                        {showFavs ? "All Pokemon" : "Favorites ⭐"}
                    </h2>
                </div>

            </div>

            {!isFiltering && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}

            {loading ? (
                <p className='loading'>Loading...</p>
            ) : (

                <div className='cards'>

                    {displayPokemon.map((poke) => (
                        <PokemonCard
                            key={poke.id}
                            pokemon={poke}
                            onSelect={setSelectedPokemon}
                            onFavorite={toggleFavorite}
                            isFavorite={favorites.find(f => f.id === poke.id)}
                        />
                    ))}

                    {showFavs && favorites.length === 0 && (
                        <p>You don't have any favorites yet</p>
                    )}

                </div>

            )}

            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}


        </main>
    )
}