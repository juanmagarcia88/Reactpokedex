import background from '../assets/pokemon-wallpaper.jpg'
import reactIcon from '../assets/react-icon.png'
import pokedex from '../assets/pokedex.png'
import './Landing.css'

export default function Landing() {
    return (
        <main
            className="landing"
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className='landing-content'>
                <div className='images'>
                    <img src={reactIcon} alt="Icono de react"></img>
                    <img src={pokedex} alt="Pokedex"></img>
                </div>

                <div className='landing-h1'>
                    <h1 className='react'>React</h1><h1 className='pokedex'>Pokedex</h1>
                </div>
            </div>
        </main>
    )
}