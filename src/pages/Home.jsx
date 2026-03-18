import { useState, useEffect } from 'react'
import './Home.css'

export default function Home() {

    const [allPokemon, setAllPokemon] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {

        const fetchPokemon = async () => {

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

            } catch (error) {
                console.error("Error fetching Pokémon", error)
            }

        }

        fetchPokemon()

    }, [page])

    return (
        <main>
            <div className="top-bar">
                <div className='home-landing-h1'>
                    <h1 className='home-react'>React</h1>
                    <h1 className='home-pokedex'>Pokedex</h1>
                </div>

                <label className="searcher">
                    Search pokemon by name:
                    <input id="searcher" type="text" />
                </label>
            </div>

            <div className="pagination">
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 0}
                >
                    Previous
                </button>

                <span>Page {page + 1}</span>

                <button onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>

            <div className='cards'>

                {allPokemon.map((poke, index) => (
                    <div className='card' key={index}>
                        <img src={poke.sprites.front_default} />
                        <h2>{poke.name}</h2>
                    </div>
                ))}

            </div>

        </main>
    )
}