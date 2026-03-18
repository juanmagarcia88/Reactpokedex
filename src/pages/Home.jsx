import './Home.css'

export default function Home() {

    return (
        <main>
            <div className="top-bar">
                <div className='home-landing-h1'>
                    <h1 className='home-react'>React</h1><h1 className='home-pokedex'>Pokedex</h1>
                </div>

                <label className="searcher" for="searcher">Search pokemon by name: 
                    <input id="searcher" type="text"/>
                </label>
            </div>

            <div>

            </div>
        </main>
    )
}