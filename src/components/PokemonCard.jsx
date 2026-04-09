import pokedex from '../assets/pokedex.png';
import { capitalize } from '../utils/capitalize';

export function PokemonCard({ pokemon, onSelect, onFavorite, isFavorite }) {
    return (
        <div onClick={() => onSelect(pokemon)} className={`card ${pokemon.types[0].type.name}`}>
            <span className='fav-star' onClick={(e) => { e.stopPropagation(); onFavorite(pokemon) }}>
                {isFavorite ? "⭐" : "☆"}
            </span>
            <img src={pokemon.sprites.front_default || pokemon.sprites.other["official-artwork"].front_default || pokedex} alt={`${capitalize(pokemon.name)} image`}/>
            <h2>{capitalize(pokemon.name)}</h2>
        </div>
    )
}