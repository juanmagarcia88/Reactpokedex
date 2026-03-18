import { useState, useEffect } from 'react'
import './Home.css'

export default function Home() {

    const [allPokemons, setAllPokemons] = useState([])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(data => setAllPokemons(data.results))
    }, [])

    return (
        <main>
            <div className="top-bar">
                <div className='home-landing-h1'>
                    <h1 className='home-react'>React</h1><h1 className='home-pokedex'>Pokedex</h1>
                </div>

                <label className="searcher">Search pokemon by name:
                    <input id="searcher" type="text" />
                </label>
            </div>

            <div className='cards'>

                {allPokemons.map((poke, index) => (
                    <div className='card' key={index}>
                        <h2>{poke.name}</h2>
                    </div>
                ))}

            </div>

        </main>
    )
}