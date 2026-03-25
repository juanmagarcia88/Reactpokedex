import pokedex from '../assets/pokedex.png';

export function PokemonCard({ pokemon, onSelect, onFavorite, isFavorite }) {
    return (
        <div onClick={() => onSelect(pokemon)} className={`card ${pokemon.types[0].type.name}`} key={pokemon.id}>
            <span className='fav-star' onClick={(e) => { e.stopPropagation(); onFavorite(pokemon) }}>
                {isFavorite ? "⭐" : "☆"}
            </span>
            <img src={pokemon.sprites.front_default || pokemon.sprites.other["official-artwork"].front_default || pokedex} />
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        </div>
    )
}