import { useState, useEffect } from 'react'
import './Home.css'

export default function Home() {

    const [allPokemon, setAllPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [pokemonList, setPokemonList] = useState([])
    const [totalPokemon, setTotalPokemon] = useState(0)

    const totalPages = Math.ceil(totalPokemon / 40)

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

            if (search) {

                const filtered = pokemonList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

                const results = []

                for (let p of filtered) {
                    const response = await fetch(p.url)
                    const data = await response.json()
                    results.push(data)
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

    }, [page, search, pokemonList])

    return (
        <main>
            <div className="top-bar">
                <div className='home-landing-h1'>
                    <h1 className='home-react'>React</h1>
                    <h1 className='home-pokedex'>Pokedex</h1>
                </div>

                <label className="searcher">
                    Search pokemon by name:
                    <input onChange={(e) => setSearch(e.target.value)} id="searcher" type="text" />
                </label>
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
                            disabled={page>=totalPages - 1}
                            className='pagination-button'        
                    >
                        Next
                    </button>
                </div>
            )}

            <div className='cards'>

                {allPokemon.map((poke, index) => (
                    <div className={`card ${poke.types[0].type.name}`} key={index}>
                        <img src={poke.sprites.front_default} />
                        <h2>{poke.name}</h2>
                    </div>
                ))}

            </div>

        </main>
    )
}