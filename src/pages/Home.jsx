import { useState, useEffect } from 'react'
import pokedex from '../assets/pokedex.png'
import './Home.css'

export default function Home() {

    const [allPokemon, setAllPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [pokemonList, setPokemonList] = useState([])
    const [totalPokemon, setTotalPokemon] = useState(0)
    const [type, setType] = useState("")
    const [favorites, setFavorites] = useState([])
    const [showFavs, setShowFavs] = useState(false)

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

                const results = []

                for (let p of filtered) {
                    const response = await fetch(p.url)
                    const data = await response.json()
                    if (!type || data.types.some(t => t.type.name === type)) {
                        results.push(data)
                    }
                }

                setAllPokemon(results)

                return
            }

            const pokemonArray = []

            try {

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${page * 40}`
                )

                const data = await response.json()

                for (let poke of data.results) {

                    const res = await fetch(poke.url)
                    const pokeData = await res.json()

                    pokemonArray.push(pokeData)
                }

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
                <div className='home-landing-h1'>
                    <h1 className='home-react'>React</h1>
                    <h1 className='home-pokedex'>Pokedex</h1>
                </div>

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
                    <div className={`card ${poke.types[0].type.name}`} key={index}>
                    <span className='fav-star' onClick={() => toggleFavorite(poke)}>
                        {favorites.find(f => f.id === poke.id) ? "⭐" : "☆"}
                    </span>
                        <img src={poke.sprites.front_default || poke.sprites.other["official-artwork"].front_default || pokedex} />
                        <h2>{poke.name}</h2>
                    </div>
                ))}

                {showFavs && favorites.length === 0 && (
                    <p>You don't have any favorites yet</p>
                )}

            </div>

        </main>
    )
}