import './pokedex.css'

const api = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

const getPokemonsData = async (api) => {
    const res = await fetch(api);
    const pokemonsData = await res.json()

    return pokemonsData;
}




const getPokemons = async (pokemonData) => {
    const pokemons = await pokemonData.results;
    return pokemons;
}

try{
    const pokemonData = await getPokemonsData(api);
    
    const pokemons = await getPokemons(pokemonData)

}catch{
    console.log("Não funcionou")
}








const Pokedex = () => {
    return (
        <div className='pokedex'>
            oi
        </div>
    )
}

export default Pokedex;