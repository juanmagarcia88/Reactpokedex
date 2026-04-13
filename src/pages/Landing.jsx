import background from '../assets/pokemon-wallpaper.jpg'
import reactIcon from '../assets/react-icon.png'
import pokedex from '../assets/pokedex.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './Landing.css'

export default function Landing() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <main
            className="landing"
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className='landing-content'>
                <a href='https://github.com/juanmagarcia88' target='_blank' rel="noopener noreferrer">
                    <p>Create by: juanmagarcia88</p>
                </a>
                <div className='images-div'>
                    <a href='https://es.react.dev/' target='_blank' rel="noopener noreferrer">
                        <img className='landing-img' src={reactIcon} alt="Icono de react"></img>
                    </a>
                    <a href='https://www.pokemon.com/es/pokedex' target='_blank' rel="noopener noreferrer">
                        <img className='landing-img' src={pokedex} alt="Pokedex"></img>
                    </a>
                </div>

                <div className='landing-h1'>
                    <h1 className='react'>React</h1><h1 className='pokedex'>Pokedex</h1>
                </div>

                <Link to="/home">
                    <button className='enter-button'>Enter</button>
                </Link>

            </div>
        </main>
    )
}