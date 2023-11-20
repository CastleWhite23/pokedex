import Card from '../card/Card';
import './pokedex.css'
import { useEffect, useState } from 'react';




const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const api = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

        const getPokemonsData = async (api) => {
            try {
                const res = await fetch(api);
                const pokemonsData = await res.json()

                const pokemons = pokemonsData.results;

                setPokemon(pokemons);
            } catch {
                console.log("erro na solicitação da api")
                return;
            }

        }
        getPokemonsData(api);


    }, [])

    
    return (
        <div className='pokedex'>
            {

                pokemon.map((poke) => (
                    <Card key={Math.floor(10000 * Math.random())} name={poke.name} />
                ))
            }
        </div>
    )
}

export default Pokedex;