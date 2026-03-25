export function PokemonModal({ pokemon, onClose }) {
    return (
        <div onClick={onClose} className='modal-overlay'>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p onClick={onClose} className='close-modal'>X</p>
                <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <div className='pokemon-info'>
                    <h2>Info:</h2>
                    <p>ID: #{pokemon.id}</p>
                    <p>Height: {pokemon.height / 10} m</p>
                    <p>Weight: {pokemon.weight / 10} kg</p>
                </div>
                <div className='pokemon-stats'>
                    <h2>Stats:</h2>
                    {pokemon.stats.map(stat => (
                        <p key={stat.stat.name}>
                            {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                        </p>
                    ))}
                </div>
                <div className='pokemon-types'>
                    <h2>Types:</h2>
                    {pokemon.types.map(t => (
                        <p key={t.type.name}>{t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</p>
                    ))}
                </div>
                <div className='pokemon-abilities'>
                    <h2>Abilities:</h2>
                    {pokemon.abilities.map(a => (
                        <p key={a.ability.name}>
                            {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}