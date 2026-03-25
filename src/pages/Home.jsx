import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import pokedex from '../assets/pokedex.png'
import './Home.css'

export default function Home() {

    const [allPokemon, setAllPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [pokemonList, setPokemonList] = useState([])
    const [totalPokemon, setTotalPokemon] = useState(0)
    const [type, setType] = useState("")
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

            try {

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
                console.error("Error fetching Pokémon", error)
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

                <div>
                    <h2 className='favorites-h2' onClick={() => setShowFavs(!showFavs)}>
                        {showFavs ? "All Pokemon" : "Favorites ⭐"}
                    </h2>
                </div>

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
            </div>

            {!search && (
                <div className="pagination">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className='pagination-button'
                    >
                        Previous
                    </button>

                    <span className='page'>Page {page + 1}</span>

                    <button onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className='pagination-button'
                    >
                        Next
                    </button>
                </div>
            )}

            <div className='cards'>

                {displayPokemon.map((poke, index) => (
                    <div onClick={() => setSelectedPokemon(poke)} className={`card ${poke.types[0].type.name}`} key={index}>
                        <span className='fav-star' onClick={(e) => { e.stopPropagation(); toggleFavorite(poke) }}>
                            {favorites.find(f => f.id === poke.id) ? "⭐" : "☆"}
                        </span>
                        <img src={poke.sprites.front_default || poke.sprites.other["official-artwork"].front_default || pokedex} />
                        <h2>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
                    </div>
                ))}

                {showFavs && favorites.length === 0 && (
                    <p>You don't have any favorites yet</p>
                )}

            </div>

            {selectedPokemon && (
                <div className='modal-overlay'>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <p onClick={() => setSelectedPokemon(null)} className='close-modal'>X</p>
                        <h1>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h1>
                        <div className='pokemon-info'>
                            <h2>Info:</h2>
                            <p>ID: #{selectedPokemon.id}</p>
                            <p>Height: {selectedPokemon.height / 10} m</p>
                            <p>Weight: {selectedPokemon.weight / 10} kg</p>
                        </div>
                        <div className='pokemon-stats'>
                            <h2>Stats:</h2>
                            {selectedPokemon.stats.map(stat => (
                                <p key={stat.stat.name}>
                                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                                </p>
                            ))}
                        </div>
                        <div className='pokemon-types'>
                            <h2>Types:</h2>
                            {selectedPokemon.types.map(t => (
                                <p key={t.type.name}>{t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</p>
                            ))}
                        </div>
                        <div className='pokemon-abilities'>
                            <h2>Abilities:</h2>
                            {selectedPokemon.abilities.map(a => (
                                <p key={a.ability.name}>
                                    {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </main>
    )
}