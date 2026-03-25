export function Header({search, setSearch, type, setType, setShowFavs, showFavs}) {
    return (
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
                    <input value={search} onChange={(e) => setSearch(e.target.value)} id="searcher" type="text" />
                </label>
                <select className='types' value={type} onChange={(e) => setType(e.target.value)}>
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
    )
}